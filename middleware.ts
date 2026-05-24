// import { NextRequest, NextResponse } from 'next/server'

// export function middleware(request: NextRequest) {
// 	const { pathname } = request.nextUrl

// 	if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
// 		const refreshToken = request.cookies.get('refreshToken')?.value

// 		if (refreshToken && pathname.startsWith('/login')) {
// 			const adminUrl = new URL('/admin', request.url)
// 			return NextResponse.redirect(adminUrl)
// 		}

// 		if (!refreshToken && pathname.startsWith('/admin')) {
// 			const loginUrl = new URL('/login', request.url)
// 			return NextResponse.redirect(loginUrl)
// 		}
// 	}

// 	return NextResponse.next()
// }

// export const config = {
// 	matcher: ['/admin/:path*', '/login/:path*'],
// }
