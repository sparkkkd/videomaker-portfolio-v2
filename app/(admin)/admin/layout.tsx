'use client'

import { Toaster } from 'react-hot-toast'

import { AdminHeader } from '@/components/admin/AdminHeader'

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<>
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
			<div className='min-h-screen bg-secondary flex flex-col'>
				<AdminHeader />
				<main className='flex-1 p-4'>{children}</main>
			</div>
		</>
	)
}
