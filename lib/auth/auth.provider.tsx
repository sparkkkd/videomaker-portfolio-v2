'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './auth.context'
import { auth } from './auth'

interface AuthRefreshResponse {
	accessToken: string
}

interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const login = useCallback((accessToken: string) => {
		auth.setAccessToken(accessToken)
		setIsAuthenticated(true)
	}, [])

	const logout = useCallback(async () => {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
				{},
				{ withCredentials: true },
			)
		} catch (error) {
			console.error(error)
		} finally {
			auth.clear()
			setIsAuthenticated(false)
			window.location.href = '/login'
		}
	}, [])

	const restoreSession = useCallback(async () => {
		if (auth.getAccessToken()) {
			setIsAuthenticated(true)
			setIsLoading(false)
			return
		}

		try {
			const response = await axios.post<AuthRefreshResponse>(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
				{},
				{
					withCredentials: true,
				},
			)
			auth.setAccessToken(response.data.accessToken)
			setIsAuthenticated(true)
		} catch {
			auth.clear()
			setIsAuthenticated(false)
			window.location.href = '/login'
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		restoreSession()
	}, [restoreSession])

	const value = useMemo(
		() => ({
			isAuthenticated,
			isLoading,
			login,
			logout,
		}),
		[isAuthenticated, isLoading, login, logout],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
