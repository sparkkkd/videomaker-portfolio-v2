import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { Project } from '@/lib/api/types/project.types'

import { useProjects } from '@/lib/api/hooks/projects.hooks'
import { useTabs } from '@/lib/api/hooks/tabs.hooks'

import { AdminProjectsListView } from './AdminProjectsListView'
import { AdminProjectsCardView } from './AdminProjectsCardView'
import { CreateEditProjectModal } from './CreateEditProjectModal'

interface AdminProjectsContentProps {
	className?: string
}

const ViewVariants: Variants = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const AdminProjectsContent = ({
	className,
}: AdminProjectsContentProps) => {
	const { data: projects = [], isLoading: projectsLoading } = useProjects()
	const { data: tabs = [], isLoading: tabsLoading } = useTabs()

	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingProject, setEditingProject] = useState<Project | null>(null)

	const handleCreate = () => {
		setEditingProject(null)
		setIsModalOpen(true)
	}

	const handleEdit = (project: Project) => {
		setEditingProject(project)
		setIsModalOpen(true)
	}

	if (projectsLoading || tabsLoading) {
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
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold text-white'>
						Управление проектами
					</h1>
					<p className='text-gray-400 mt-2'>
						Добавляйте и редактируйте работы в портфолио
					</p>

					<div className='mt-4 w-fit flex items-center gap-1 bg-[#272727] p-1 rounded-lg'>
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

				<button
					className={twMerge(
						'px-4 py-2 bg-accent text-white font-semibold rounded-lg',
						'hover:bg-accent/70 transition-colors',
						'flex items-center space-x-2',
					)}
					onClick={handleCreate}
				>
					<span>+</span>
					<span>Создать проект</span>
				</button>
			</div>

			<AnimatePresence mode='wait'>
				{viewMode === 'grid' && (
					<motion.div
						key='grid-view'
						variants={ViewVariants}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<AdminProjectsCardView projects={projects} onEdit={handleEdit} />
					</motion.div>
				)}

				{viewMode === 'list' && (
					<motion.div
						key='list-view'
						variants={ViewVariants}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<AdminProjectsListView projects={projects} onEdit={handleEdit} />
					</motion.div>
				)}

				{projects.length === 0 && (
					<motion.button
						key='no-projects'
						className='py-6 w-full text-center bg-[#1f1f1f] rounded-xl border border-[#272727] shadow-md transition-colors duration-300 hover:bg-secondary'
						onClick={handleCreate}
					>
						<p className='text-gray-400'>Нет проектов. Создайте первый!</p>
					</motion.button>
				)}
			</AnimatePresence>

			<CreateEditProjectModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				project={editingProject}
				availableTabs={tabs}
			/>
		</div>
	)
}
