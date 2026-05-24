import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import type { ITokenResponse } from '@/lib/api/types'

declare module 'next-auth' {
	interface User {
		accessToken?: string
		refreshToken?: string
	}
	interface Session {
		accessToken?: string
		refreshToken?: string
	}
	interface JWT {
		accessToken?: string
		refreshToken?: string
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(credentials),
						},
					)

					if (!res.ok) return null
					const tokens: ITokenResponse = await res.json()

					return {
						accessToken: tokens.accessToken,
						refreshToken: tokens.refreshToken,
					}
				} catch {
					return null
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user?.accessToken) {
				token.accessToken = user.accessToken
				token.refreshToken = user.refreshToken
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string
			session.refreshToken = token.refreshToken as string
			return session
		},
	},

	pages: {
		signIn: '/login',
		signOut: '/login',
	},

	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},

	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				domain:
					process.env.NODE_ENV === 'production'
						? '.dmitrikuzmin.ru'
						: undefined,
			},
		},
	},

	trustHost: true,
})
