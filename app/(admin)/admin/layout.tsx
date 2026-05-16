'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { QueryProvider } from '@/components/admin/QueryProvider'
import { AuthProvider } from '@/lib/auth/auth.provider'
import { Toaster } from 'react-hot-toast'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<Toaster
				position='top-right'
				toastOptions={{
					style: {
						background: '#1f1f1f',
						color: '#fff',
						border: '1px solid #272727',
					},
				}}
			/>
			<AuthProvider>
				<div className='min-h-screen bg-secondary flex flex-col'>
					<AdminHeader />
					<main className='flex-1 p-4'>{children}</main>
				</div>
			</AuthProvider>
		</QueryProvider>
	)
}
