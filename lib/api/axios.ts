import axios, {
	AxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import { AUTH_KEYS } from '../auth'

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

export interface ApiSuccessResponse<T> {
	data: T
}

const axiosInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000,
})

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)

			if (token && config.headers) {
				config.headers.set('Authorization', `Bearer ${token}`)
			}
		}

		return config
	},
	(error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response.data,
	async (error) => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN)

				if (!refreshToken) throw new Error('Refresh token not found')

				const {
					data: { accessToken, refreshToken: newRefreshToken },
				} = await axios.post(
					`${axiosInstance.defaults.baseURL}/auth/refresh`,
					{},
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
							'Content-Type': 'application/json',
						},
					},
				)

				localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken)

				if (newRefreshToken) {
					localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, newRefreshToken)
				}

				if (originalRequest.headers) {
					originalRequest.headers.set('Authorization', `Bearer ${accessToken}`)
				}

				return axiosInstance(originalRequest)
			} catch (error) {
				localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN)
				localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN)

				if (typeof window !== 'undefined') {
					window.location.href = '/admin/login'
				}

				return Promise.reject(error)
			}
		}

		return Promise.reject(error)
	},
)

export const api: ApiClient = axiosInstance

export default axiosInstance
