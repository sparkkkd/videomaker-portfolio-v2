'use client'

import { createContext, useContext } from 'react'
import { AuthContextValue } from './auth.types'

export const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuthContext = () => {
	const context = useContext(AuthContext)

	if (!context)
		throw new Error('useAuthContext must be used within AuthProvider')

	return context
}
