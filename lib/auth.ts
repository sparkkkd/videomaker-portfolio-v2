'use client'

import { api } from './api/axios'
import { ITokenResponse } from './api/types'

export const AUTH_KEYS = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
} as const

export const auth = {
	setTokens: ({ accessToken, refreshToken }: ITokenResponse): void => {
		localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken)
		localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, refreshToken)
	},

	getAccessToken: () => {
		return localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)
	},

	getRefreshToken: () => {
		return localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN)
	},

	isTokenValid: (): boolean => {
		const token = auth.getAccessToken()

		if (!token) return false

		try {
			const payloadBase64 = token.split('.')[1]
			const payload = JSON.parse(atob(payloadBase64))

			const now = Date.now() / 1000
			return payload.exp > now
		} catch {
			return false
		}
	},

	isAuthenticated: () => {
		return !!auth.isTokenValid()
	},

	logout: () => {
		api.post(
			'/auth/logout',
			{},
			{ headers: { Authorization: `Bearer ${auth.getRefreshToken()}` } },
		)

		localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN)
		localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN)
	},

	getAuthHeader: (): Record<string, string> => {
		const token = auth.getAccessToken()

		return token ? { Authorization: `Bearer ${token}` } : {}
	},
}
