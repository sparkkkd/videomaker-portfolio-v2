'use client'

import { api } from '../api/axios'
import { tokenStorage } from './token-storage'

export const auth = {
	setAccessToken(accessToken: string): void {
		tokenStorage.setAccessToken(accessToken)
	},

	getAccessToken(): string | null {
		return tokenStorage.getAccessToken()
	},

	isAuthenticated(): boolean {
		return !!tokenStorage.getAccessToken()
	},

	async logout(): Promise<void> {
		try {
			await api.post('/auth/logout')
		} finally {
			tokenStorage.clear()

			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}
		}
	},

	getAuthHeader(): Record<string, string> {
		const token = tokenStorage.getAccessToken()

		return token
			? {
					Authorization: `Bearer ${token}`,
				}
			: {}
	},
}
