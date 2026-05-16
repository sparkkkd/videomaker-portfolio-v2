import { Project } from '@/lib/api/types/project.types'
import { AdminProjectCard } from './AdminProjectCard'
import { twMerge } from 'tailwind-merge'

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
	return (
		<div className={twMerge(className, 'grid grid-cols-3 gap-6')}>
			{projects.map((project) => (
				<AdminProjectCard project={project} key={project.id} onEdit={onEdit} />
			))}
		</div>
	)
}
