'use client'

import { api } from '../api/axios'

export const auth = {
	setAccessToken(accessToken: string): void {
		localStorage.setItem('accessToken', accessToken)
	},

	getAccessToken(): string | null {
		return localStorage.getItem('accessToken')
	},

	isAuthenticated(): boolean {
		return !!localStorage.getItem('accessToken')
	},

	clear: (): void => {
		localStorage.removeItem('accessToken')
	},

	async logout(): Promise<void> {
		try {
			await api.post('/auth/logout')
		} finally {
			localStorage.removeItem('accessToken')

			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}
		}
	},

	getAuthHeader(): Record<string, string> {
		const token = auth.getAccessToken()

		return token
			? {
					Authorization: `Bearer ${token}`,
				}
			: {}
	},
}
