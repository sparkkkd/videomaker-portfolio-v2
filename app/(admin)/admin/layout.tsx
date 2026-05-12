'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { QueryProvider } from '@/components/admin/QueryProvider'
import { AuthProvider } from '@/lib/auth/auth.provider'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<AuthProvider>
				<div className='min-h-screen bg-secondary flex flex-col'>
					<AdminHeader />
					<main className='flex-1 p-4'>{children}</main>
				</div>
			</AuthProvider>
		</QueryProvider>
	)
}
