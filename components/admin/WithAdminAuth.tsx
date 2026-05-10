'use client'

import { auth } from '@/lib/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface WithAdminAuthProps {
	children: React.ReactNode
	redirectTo?: string
}

export const WithAdminAuth = ({
	children,
	redirectTo = '/admin/login',
}: WithAdminAuthProps) => {
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (!auth.isAuthenticated() && !pathname.includes('/login')) {
			router.replace(redirectTo)
			return
		}
	}, [router, pathname, redirectTo])

	if (!auth.isAuthenticated() && !pathname.includes('/login')) {
		return (
			<div className='min-h-screen flex item-center justify-center bg-secondary'>
				<div className='animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent' />
			</div>
		)
	}

	return <>{children}</>
}
