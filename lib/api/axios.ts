import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

import { auth } from '../auth/auth'

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
	failedQueue.forEach((request) => {
		if (error) {
			request.reject(error)

			return
		}

		request.resolve(token!)
	})

	failedQueue.length = 0
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const accessToken = auth.getAccessToken()

	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response.data,

	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error)
		}

		originalRequest._retry = true

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				failedQueue.push({
					resolve: (token: string) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`
						}

						resolve(axiosInstance(originalRequest))
					},

					reject,
				})
			})
		}

		isRefreshing = true

		try {
			const response = await axios.post<{
				accessToken: string
			}>(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
				{},
				{
					withCredentials: true,
				},
			)

			const newAccessToken = response.data.accessToken

			auth.setAccessToken(newAccessToken)

			processQueue(null, newAccessToken)

			if (originalRequest.headers) {
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
			}

			return axiosInstance(originalRequest)
		} catch (refreshError) {
			processQueue(refreshError)

			auth.clear()

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
