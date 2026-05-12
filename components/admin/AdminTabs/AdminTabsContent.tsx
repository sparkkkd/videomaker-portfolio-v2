'use client'

import { useAdminStore } from '@/lib/store/admin.store'
import { twMerge } from 'tailwind-merge'
import { AdminTabs } from './AdminTabs'

interface AdminTabsContentProps {
	className?: string
}

export const AdminTabsContent = ({ className }: AdminTabsContentProps) => {
	const { tabs } = useAdminStore()

	return (
		<div className={twMerge(className, 'mt-5 space-y-6')}>
			<div className='flex items-center justify-between'>
				<div className='text-white'>
					<h1 className='text-2xl font-bold'>Управление табами</h1>
					<p className='text-gray-400 mt-2'>
						Создавайте и редактируйте разделы портфолио
					</p>
				</div>

				<button
					className={twMerge(
						'px-4 py-2 bg-accent text-white font-semibold rounded-lg',
						'hover:bg-accent/70 transition-colors',
						'flex items-center space-x-2',
					)}
				>
					<span>+</span>
					<span>Создать таб</span>
				</button>
			</div>

			<AdminTabs tabs={tabs} />
		</div>
	)
}
