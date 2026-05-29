import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

export interface ApiErrorResponse {
	statusCode: number
	message: string | string[]
	error?: string
	timestamp: string
	path: string
}

type FailedQueueItem = {
	resolve: (token: string) => void
	reject: (error: unknown) => void
}
interface ApiClient {
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
	patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const createApiClient = (instance: AxiosInstance): ApiClient => ({
	get: <T>(url: string, config?: AxiosRequestConfig) =>
		instance.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),
	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		instance
			.post<T>(url, data, config)
			.then((res: AxiosResponse<T>) => res.data),
	patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		instance
			.patch<T>(url, data, config)
			.then((res: AxiosResponse<T>) => res.data),
	delete: <T>(url: string, config?: AxiosRequestConfig) =>
		instance.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data),
})

const publicInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

publicInstance.interceptors.response.use(
	(res: AxiosResponse) => res.data,
	(error: AxiosError) => Promise.reject(error),
)

export const publicApi = createApiClient(publicInstance)

let currentAccessToken: string | null = null

const failedQueue: FailedQueueItem[] = []
let isRefreshing = false

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach((req) =>
		error ? req.reject(error) : req.resolve(token!),
	)
	failedQueue.length = 0
}

const privateInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

privateInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		if (config.headers?.Authorization) return config

		if (typeof window !== 'undefined') {
			if (currentAccessToken) {
				config.headers.set('Authorization', `Bearer ${currentAccessToken}`)
				return config
			}
			try {
				const res = await fetch('/api/auth/session')
				const session = await res.json()
				if (session?.accessToken) {
					currentAccessToken = session.accessToken
					config.headers.set('Authorization', `Bearer ${currentAccessToken}`)
				}
			} catch {}
		} else {
			try {
				const authModule = await import('@/auth')
				if (authModule?.auth) {
					const session = await authModule.auth()
					if (session?.accessToken && config.headers) {
						config.headers.set('Authorization', `Bearer ${session.accessToken}`)
					}
				}
			} catch {}
		}

		return config
	},
)

privateInstance.interceptors.response.use(
	(res: AxiosResponse) => res.data,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error)
		}

		if (originalRequest.url?.includes('/auth/refresh')) {
			if (typeof window !== 'undefined') window.location.href = '/login'
			return Promise.reject(error)
		}

		originalRequest._retry = true

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token: string) => {
						if (originalRequest.headers)
							originalRequest.headers.set('Authorization', `Bearer ${token}`)
						resolve(privateInstance(originalRequest))
					},
					reject,
				})
			})
		}

		isRefreshing = true

		try {
			const sessionRes = await fetch('/api/auth/session')
			const session = await sessionRes.json()
			const refreshToken = session?.refreshToken
			if (!refreshToken) throw new Error('No refresh token')

			const { data } = await axios.post<{ accessToken: string }>(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
				{ refreshToken },
				{ headers: { 'Content-Type': 'application/json' } },
			)

			currentAccessToken = data.accessToken
			processQueue(null, currentAccessToken)

			if (originalRequest.headers) {
				originalRequest.headers.set(
					'Authorization',
					`Bearer ${currentAccessToken}`,
				)
			}

			return privateInstance(originalRequest)
		} catch (refreshError: unknown) {
			const axiosError = refreshError as AxiosError<ApiErrorResponse>
			console.error('Refresh failed:', axiosError?.response?.data)
			processQueue(refreshError)
			currentAccessToken = null
			if (typeof window !== 'undefined') window.location.href = '/login'
			return Promise.reject(refreshError)
		} finally {
			isRefreshing = false
		}
	},
)

export const api = createApiClient(privateInstance)
export default api
