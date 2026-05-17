'use client'

import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

import { Tab } from '@/lib/api/types/tabs.types'
import { useTabs } from '@/lib/api/hooks/tabs.hooks'

import { CreateEditTabModal } from './CreateEditTabModal'
import { AdminTabsSortable } from './AdminTabsSortable'

interface AdminTabsContentProps {
	className?: string
}

export const AdminTabsContent = ({ className }: AdminTabsContentProps) => {
	const { data: tabs = [], isLoading, error } = useTabs()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingTab, setEditingTab] = useState<Tab | null>(null)

	const handleCreate = () => {
		setEditingTab(null)
		setIsModalOpen(true)
	}

	const handleEdit = (tab: Tab) => {
		setEditingTab(tab)
		setIsModalOpen(true)
	}

	if (isLoading) {
		return (
			<div
				className={twMerge(
					className,
					'mt-5 flex items-center justify-center py-12',
				)}
			>
				<div className='animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent' />
			</div>
		)
	}

	if (error) {
		return (
			<div
				className={twMerge(className, 'mt-5 text-center py-12 text-rose-400')}
			>
				<p>Ошибка загрузки табов: {error.message}</p>
				<button
					onClick={() => window.location.reload()}
					className='mt-4 text-accent hover:underline'
				>
					Попробовать снова
				</button>
			</div>
		)
	}

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
					onClick={handleCreate}
				>
					<span>+</span>
					<span>Создать таб</span>
				</button>
			</div>

			<AdminTabsSortable tabs={tabs} onEdit={handleEdit} />

			<CreateEditTabModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				tab={editingTab}
			/>
		</div>
	)
}
