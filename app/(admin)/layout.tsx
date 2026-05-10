'use client'

import { QueryProvider } from '@/components/admin/QueryProvider'
import { WithAdminAuth } from '@/components/admin/WithAdminAuth'
import { AdminSiderbar } from '../../components/admin/AdminSiderbar'
import { usePathname } from 'next/navigation'

export default function layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	const isAuthRoute = pathname?.startsWith('/admin/login')

	if (isAuthRoute) return <QueryProvider>{children}</QueryProvider>

	return (
		<QueryProvider>
			<WithAdminAuth>
				<div className='min-h-screen bg-gray-50 flex'>
					<AdminSiderbar className='w-[30%]' />

					{/* Main content */}
					<div className='flex-1 flex flex-col min-w-0'>
						{/* Admin header */}
						<div className='w-full p-10 bg-secondary'>Admin header</div>
						<main className='flex-1 p-4'>{children}</main>
					</div>
				</div>
			</WithAdminAuth>
		</QueryProvider>
	)
}
