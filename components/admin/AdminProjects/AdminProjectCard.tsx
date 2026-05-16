import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

import { getFullImageUrl } from '@/lib/utils/getFullImageUrl'
import { getErrorMessage } from '@/lib/utils/errorHandlers'

import { Project } from '@/lib/api/types/project.types'

import { useDeleteProject } from '@/lib/api/hooks/projects.hooks'
import { Loader } from '@/components/ui/Loader'

interface AdminProjectCardProps {
	className?: string
	project: Project
	onEdit: (project: Project) => void
}

export const AdminProjectCard = ({
	className,
	project,
	onEdit,
}: AdminProjectCardProps) => {
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
		<div
			key={project.id}
			className={twMerge(
				className,
				'bg-[#1f1f1f] rounded-xl shadow-lg border border-[#272727] overflow-hidden',
				'hover:shadow-xl transition-shadow',
			)}
		>
			<div className='aspect-video bg-dark relative overflow-hidden'>
				{project.src ? (
					<img
						src={getFullImageUrl(project.src)}
						alt={project.label}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center text-gray-500'>
						Нет изображения
					</div>
				)}

				<div className='absolute top-3 right-3 pointer-events-none'>
					<span
						className={twMerge(
							'px-2 py-1 rounded text-xs font-medium',
							project.isActive
								? 'bg-green-500 text-white'
								: 'bg-gray-500 text-white',
						)}
					>
						{project.isActive ? '✓' : '✕'}
					</span>
				</div>
			</div>

			<div className='p-4 space-y-3'>
				<div>
					<h3 className='font-semibold text-white'>{project.label}</h3>
					{project.description && (
						<p className='text-sm text-gray-400 mt-1 line-clamp-2'>
							{project.description}
						</p>
					)}
				</div>

				<div className='flex items-center justify-between pt-3 border-t border-gray-400'>
					<span className='text-xs text-gray-400'>
						#{project.id.slice(0, 6)}
					</span>

					<div className='flex items-center space-x-3'>
						<button
							className='text-lg text-slate-400 hover:text-slate-200'
							onClick={() => onEdit(project)}
						>
							✎
						</button>
						<button
							className='min-w-[24.72px] relative text-lg'
							onClick={() => handleDelete(project.id)}
						>
							{isDeleting ? <Loader size='sm' /> : '🗑️'}
						</button>
					</div>
				</div>

				{project.href && (
					<a
						href={project.href}
						target='_blank'
						rel='noopener noreferrer'
						className='text-sm text-accent hover:text-accent/70 transition-colors duration-300'
					>
						Открыть проект →
					</a>
				)}
			</div>
		</div>
	)
}
