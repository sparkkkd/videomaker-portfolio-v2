'use client'

import { AdminSiderbar } from '@/components/admin/AdminSiderbar'
import { QueryProvider } from '@/components/admin/QueryProvider'
import { AuthProvider } from '@/lib/auth/auth.provider'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<AuthProvider>
				<div className='min-h-screen bg-gray-50 flex'>
					<AdminSiderbar className='w-[30%]' />

					{/* Main content */}
					<div className='flex-1 flex flex-col min-w-0'>
						{/* Admin header */}
						<div className='w-full p-10 bg-secondary'>Admin header</div>
						<main className='flex-1 p-4'>{children}</main>
					</div>
				</div>
			</AuthProvider>
		</QueryProvider>
	)
}
