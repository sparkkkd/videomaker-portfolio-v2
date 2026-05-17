'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

import { Project } from '@/lib/api/types/project.types'
import { useDeleteProject } from '@/lib/api/hooks/projects.hooks'
import { getErrorMessage } from '@/lib/utils/errorHandlers'

import { ConfirmDeleteModal } from '../ConfirmDeleteModal'
import { AdminProjectCard } from './AdminProjectCard'

interface AdminProjectCardViewProps {
	className?: string
	projects: Project[]
	onEdit: (project: Project) => void
}

export const AdminProjectsCardView = ({
	className,
	projects,
	onEdit,
}: AdminProjectCardViewProps) => {
	const { mutateAsync: deleteProject, isPending: isDeleting } =
		useDeleteProject()
	const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
		null,
	)

	const handleDelete = async (projectId: string) => {
		try {
			await deleteProject(projectId)
			toast.success('Проект успешно удалён')
		} catch (error) {
			console.error('Delete error:', error)
			toast.error(getErrorMessage(error))
		} finally {
			setDeletingProjectId(null)
		}
	}

	const projectBeingDeleted = projects.find((p) => p.id === deletingProjectId)

	return (
		<>
			<div className={twMerge(className, 'grid grid-cols-3 gap-6')}>
				{projects.map((project) => (
					<AdminProjectCard
						key={project.id}
						project={project}
						onEdit={onEdit}
						onDelete={() => setDeletingProjectId(project.id)}
						isDeleting={isDeleting && deletingProjectId === project.id}
					/>
				))}
			</div>

			<ConfirmDeleteModal
				isOpen={!!projectBeingDeleted}
				onClose={() => setDeletingProjectId(null)}
				onConfirm={() =>
					projectBeingDeleted && handleDelete(projectBeingDeleted.id)
				}
				description={
					projectBeingDeleted
						? `Вы действительно хотите удалить проект "${projectBeingDeleted.label}"? Это действие нельзя отменить.`
						: ''
				}
				entityName='проект'
				isDeleting={isDeleting}
			/>
		</>
	)
}
