'use client'

import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { getFullImageUrl } from '@/lib/utils/getFullImageUrl'

import { Project } from '@/lib/api/types/project.types'

import { useDeleteProject } from '@/lib/api/hooks/projects.hooks'
import { getErrorMessage } from '@/lib/utils/errorHandlers'
import { Loader } from '@/components/ui/Loader'

interface AdminProjectsListViewProps {
	className?: string
	projects: Project[]
	onEdit: (project: Project) => void
}

export const AdminProjectsListView = ({
	className,
	projects,
	onEdit,
}: AdminProjectsListViewProps) => {
	return (
		<div
			className={twMerge(
				className,
				'bg-[#1f1f1f] rounded-xl text-white shadow-md border border-[#1f1f1f] overflow-hidden',
			)}
		>
			<table className='w-full'>
				<thead className='bg-[#1f1f1f] border-b border-[#272727] shadow-sm'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Превью
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Название
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Статус
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Порядок
						</th>
						<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Действия
						</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-[#272727]'>
					<AnimatePresence>
						{projects.map((project) => (
							<ProjectItem key={project.id} project={project} onEdit={onEdit} />
						))}
					</AnimatePresence>
				</tbody>
			</table>

			{projects.length === 0 && (
				<div className='text-center py-12 text-gray-400'>...</div>
			)}
		</div>
	)
}

const ProjectItem = ({
	project,
	onEdit,
}: {
	project: Project
	onEdit: (project: Project) => void
}) => {
	const { mutateAsync: deleteProject, isPending: isDeleting } =
		useDeleteProject()

	const handleDelete = async (projectId: string) => {
		try {
			await deleteProject(projectId)
			toast.success('Проект успешно удалён')
		} catch (error) {
			console.error(error)
			toast.error(getErrorMessage(error))
		}
	}

	return (
		<motion.tr
			key={project.id}
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0, transition: { delay: 0, duration: 0.3 } }}
			exit={{ opacity: 0, y: -10 }}
			className='hover:bg-secondary transition-colors duration-200'
		>
			<td className='px-6 py-4'>
				<div className='w-14 h-10 rounded-lg overflow-hidden bg-[#272727] flex-shrink-0 border border-[#272727]'>
					{project.src ? (
						<img
							src={getFullImageUrl(project.src)}
							alt={project.label}
							className='w-full h-full object-cover'
						/>
					) : (
						<div className='w-full h-full flex items-center justify-center text-gray-500 text-[10px]'>
							Нет
						</div>
					)}
				</div>
			</td>

			<td className='px-6 py-4'>
				<div className='font-medium text-white'>{project.label}</div>
				{project.description && (
					<div className='text-sm text-gray-400 truncate max-w-xs mt-0.5'>
						{project.description}
					</div>
				)}
			</td>

			<td className='px-6 py-4'>
				<span
					className={twMerge(
						'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
						project.isActive
							? 'bg-[#272727] text-teal-500 font-semibold'
							: 'bg-[#272727] text-gray-400',
					)}
				>
					{project.isActive ? 'Активен' : 'Скрыт'}
				</span>
			</td>

			<td className='px-6 py-4'>
				<span className='text-white'>{project.order}</span>
			</td>

			<td className='px-6 py-4 text-right'>
				<div className='flex justify-end items-center gap-5'>
					<button
						className='text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors duration-200'
						onClick={() => onEdit(project)}
					>
						Редактировать
					</button>
					<button
						className='relative min-w-[53.52px] text-rose-800 hover:text-rose-600 text-sm font-medium transition-colors duration-200'
						onClick={() => handleDelete(project.id)}
						disabled={isDeleting}
					>
						{isDeleting ? <Loader size='sm' /> : 'Удалить'}
					</button>
				</div>
			</td>
		</motion.tr>
	)
}
