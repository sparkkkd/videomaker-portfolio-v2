'use client'

import { auth } from '@/lib/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader } from '../ui/Loader'

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
			<div className='min-h-screen relative flex item-center justify-center bg-secondary'>
				<Loader />
			</div>
		)
	}

	return <>{children}</>
}
