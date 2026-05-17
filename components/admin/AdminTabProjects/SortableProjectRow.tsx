'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import toast from 'react-hot-toast'

import { Project } from '@/lib/api/types/project.types'
import { getFullImageUrl } from '@/lib/utils/getFullImageUrl'
import { useDeleteProject } from '@/lib/api/hooks/projects.hooks'
import { getErrorMessage } from '@/lib/utils/errorHandlers'

import { Loader } from '@/components/ui/Loader'
import { ConfirmDeleteModal } from '../ConfirmDeleteModal'

interface SortableProjectRowProps {
	project: Project
	index: number
	onEdit: (project: Project) => void
}

export function SortableProjectRow({
	project,
	index,
	onEdit,
}: SortableProjectRowProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: project.id })
	const { mutateAsync: deleteProject, isPending: isDeleting } =
		useDeleteProject()

	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 50 : 'auto',
		opacity: isDragging ? 0.4 : 1,
	}

	const handleDelete = async () => {
		try {
			await deleteProject(project.id)
			toast.success('Проект успешно удалён')
		} catch (error) {
			console.error('Delete error:', error)
			toast.error(getErrorMessage(error))
		}
	}

	return (
		<>
			<tr
				ref={setNodeRef}
				style={style}
				className={twMerge(
					'hover:bg-secondary transition-colors duration-200',
					isDragging && 'bg-[#272727]',
				)}
			>
				{/* Drag Handle */}
				<td
					className='w-10 px-4 py-4 cursor-grab active:cursor-grabbing'
					{...attributes}
					{...listeners}
				>
					<div className='flex justify-center text-gray-500 hover:text-white transition-colors'>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 8h16M4 16h16'
							/>
						</svg>
					</div>
				</td>

				{/* Preview */}
				<td className='px-6 py-4'>
					<div className='w-14 h-10 rounded-lg overflow-hidden bg-[#272727] border border-[#272727] flex-shrink-0'>
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

				{/* label + description */}
				<td className='px-6 py-4'>
					<div className='font-medium text-white'>{project.label}</div>
					{project.description && (
						<div className='text-sm text-gray-400 truncate max-w-xs mt-0.5'>
							{project.description}
						</div>
					)}
				</td>

				{/* Status */}
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

				{/* Order */}
				<td className='px-6 py-4'>
					<span className='text-white font-mono'>{index + 1}</span>
				</td>

				{/* Category */}
				<td className='px-6 py-4 text-right'>
					<span className='text-white font-mono'>{project.tab.label}</span>
				</td>

				{/* Actions */}
				<td className='px-6 py-4 text-right space-x-5'>
					<button
						onClick={() => onEdit(project)}
						className='text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors duration-200'
					>
						Редактировать
					</button>
					<button
						onClick={() => setIsConfirmOpen(true)}
						disabled={isDeleting}
						className='text-rose-800 hover:text-rose-600 text-sm font-medium transition-colors duration-200 disabled:opacity-50'
					>
						{isDeleting ? <Loader size='sm' /> : 'Удалить'}
					</button>
				</td>
			</tr>

			<ConfirmDeleteModal
				isOpen={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={handleDelete}
				description={`Вы действительно хотите удалить проект "${project.label}"? Это действие нельзя отменить.`}
				entityName='проект'
				isDeleting={isDeleting}
			/>
		</>
	)
}
