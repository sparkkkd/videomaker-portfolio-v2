import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

export const publicApi: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

publicApi.interceptors.response.use(
	(res: AxiosResponse) => res.data,
	(error: AxiosError) => Promise.reject(error),
)

let currentAccessToken: string | null = null

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

const privateApi: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
})

privateApi.interceptors.request.use(
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

privateApi.interceptors.response.use(
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
						resolve(privateApi(originalRequest))
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

			return privateApi(originalRequest)
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

export const api = privateApi
export default privateApi
