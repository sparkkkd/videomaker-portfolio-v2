'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import toast from 'react-hot-toast'

import { Project } from '@/lib/api/types/project.types'
import { getErrorMessage } from '@/lib/utils/errorHandlers'
import { useDeleteProject } from '@/lib/api/hooks/projects.hooks'

import { AdminProjectCard } from '../AdminProjects/AdminProjectCard'
import { ConfirmDeleteModal } from '../ConfirmDeleteModal'

interface SortableProjectCardProps {
	project: Project
	index: number
	onEdit: (project: Project) => void
	className?: string
}

export function SortableProjectCard({
	project,
	index,
	onEdit,
	className,
}: SortableProjectCardProps) {
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
		opacity: isDragging ? 0.5 : 1,
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
			<div
				ref={setNodeRef}
				style={style}
				className={twMerge(
					isDragging && 'ring-2 ring-accent scale-105',
					className,
				)}
			>
				<AdminProjectCard
					project={project}
					onEdit={onEdit}
					onDelete={() => setIsConfirmOpen(true)}
					dragHandleProps={{ ...attributes, ...listeners }}
					orderBadge={index + 1}
					isDeleting={isDeleting}
				/>
			</div>

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
