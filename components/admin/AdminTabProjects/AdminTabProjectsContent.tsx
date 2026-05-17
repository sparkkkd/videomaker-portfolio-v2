'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import type { Project } from '@/lib/api/types/project.types'
import { useAdminStore } from '@/lib/store/admin.store'
import { useTabs } from '@/lib/api/hooks/tabs.hooks'
import { useProjectsByTab } from '@/lib/api/hooks/projects.hooks'

import { AdminProjectsSortable } from './AdminProjectsSortable'
import { CreateEditProjectModal } from '../AdminProjects/CreateEditProjectModal'

interface AdminTabProjectsContentProps {
	className?: string
}

export function AdminTabProjectsContent({
	className,
}: AdminTabProjectsContentProps) {
	const { selectedTabId, setSelectedTabId } = useAdminStore()
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingProject, setEditingProject] = useState<Project | null>(null)

	const { data: tabs = [], isLoading: tabsLoading } = useTabs()
	const { data: projects = [], isLoading: projectsLoading } =
		useProjectsByTab(selectedTabId)

	useEffect(() => {
		if (tabs.length > 0 && !selectedTabId) {
			setSelectedTabId(tabs[0].id)
		}
	}, [tabs, selectedTabId, setSelectedTabId])

	const handleEdit = (project: Project) => {
		setEditingProject(project)
		setIsModalOpen(true)
	}

	if (tabsLoading) {
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

	return (
		<div className={twMerge(className, 'mt-5 space-y-6')}>
			<div className='flex flex-col items-start justify-between gap-4'>
				<div className='text-white'>
					<h1 className='text-2xl font-bold'>Проекты по табам</h1>
					<p className='mt-2 text-gray-400'>
						Управляйте проектами внутри выбранного раздела
					</p>
				</div>
				<div className='flex items-center gap-3 w-full'>
					<select
						value={selectedTabId || ''}
						onChange={(e) => setSelectedTabId(e.target.value || null)}
						className='px-4 py-2 bg-[#272727] border border-[#272727] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50 min-w-[200px]'
					>
						<option value=''>Выберите раздел</option>
						{tabs.map((tab) => (
							<option key={tab.id} value={tab.id}>
								{tab.label}
							</option>
						))}
					</select>

					<div className='flex items-center gap-1 bg-[#272727] p-1 rounded-lg'>
						<button
							onClick={() => setViewMode('grid')}
							className={twMerge(
								'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
								viewMode === 'grid'
									? 'bg-[#1f1f1f] text-white shadow-sm'
									: 'text-gray-400 hover:text-white',
							)}
						>
							Сетка
						</button>
						<button
							onClick={() => setViewMode('list')}
							className={twMerge(
								'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
								viewMode === 'list'
									? 'bg-[#1f1f1f] text-white shadow-sm'
									: 'text-gray-400 hover:text-white',
							)}
						>
							Список
						</button>
					</div>
				</div>
			</div>

			{!selectedTabId ? (
				<div className='text-center py-12 bg-[#1f1f1f] rounded-xl border border-[#272727]'>
					<p className='text-gray-400'>
						Выберите раздел сверху, чтобы увидеть проекты
					</p>
				</div>
			) : projectsLoading ? (
				<div className='flex items-center justify-center py-12'>
					<div className='animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent' />
				</div>
			) : projects.length === 0 ? (
				<div className='text-center py-12 bg-[#1f1f1f] rounded-xl border border-[#272727]'>
					<p className='text-gray-400'>В этом разделе пока нет проектов</p>
				</div>
			) : (
				<AdminProjectsSortable
					projects={projects}
					onEdit={handleEdit}
					viewMode={viewMode}
					tabId={selectedTabId}
				/>
			)}

			<CreateEditProjectModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					setEditingProject(null)
				}}
				project={editingProject}
				availableTabs={tabs}
			/>
		</div>
	)
}
