import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

let currentAccessToken: string | null = null

export interface ApiClient {
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
	post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
	patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>
	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

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

const failedQueue: FailedQueueItem[] = []
let isRefreshing = false

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach((req) =>
		error ? req.reject(error) : req.resolve(token!),
	)
	failedQueue.length = 0
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
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
				const { auth } = await import('@/auth')
				const session = await auth()
				if (session?.accessToken && config.headers) {
					config.headers.set('Authorization', `Bearer ${session.accessToken}`)
				}
			} catch {}
		}

		return config
	},
)

axiosInstance.interceptors.response.use(
	(res: AxiosResponse) => res.data,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error)
		}

		if (originalRequest.url?.includes('/auth/refresh')) {
			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}
			return Promise.reject(error)
		}

		originalRequest._retry = true

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token: string) => {
						if (originalRequest.headers) {
							originalRequest.headers.set('Authorization', `Bearer ${token}`)
						}
						resolve(axiosInstance(originalRequest))
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

			if (!refreshToken) throw new Error('No refresh token in session')

			const { data } = await axios.post<{
				accessToken: string
				refreshToken: string
			}>(
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

			return axiosInstance(originalRequest)
		} catch (refreshError: unknown) {
			const axiosError = refreshError as AxiosError<ApiErrorResponse>
			console.error(
				'Token refresh failed:',
				axiosError?.response?.data || axiosError?.message,
			)

			processQueue(refreshError)
			currentAccessToken = null

			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}

			return Promise.reject(refreshError)
		} finally {
			isRefreshing = false
		}
	},
)

export const api: ApiClient = axiosInstance
export default axiosInstance
