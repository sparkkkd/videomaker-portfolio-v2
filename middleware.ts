import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
	const { pathname } = req.nextUrl
	const isLoggedIn = !!req.auth

	if (pathname.startsWith('/admin') && !isLoggedIn) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (pathname.startsWith('/login') && isLoggedIn) {
		return NextResponse.redirect(new URL('/admin', req.url))
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/admin/:path*', '/login'],
}
