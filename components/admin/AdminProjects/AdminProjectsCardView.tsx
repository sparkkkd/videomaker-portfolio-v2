import { IProject } from '@/lib/api/types'
import { AdminProjectCard } from './AdminProjectCard'
import { twMerge } from 'tailwind-merge'

interface AdminProjectCardViewProps {
	className?: string
	projects: IProject[]
}

export const AdminProjectsCardView = ({
	className,
	projects,
}: AdminProjectCardViewProps) => {
	return (
		<div className={twMerge(className, 'grid grid-cols-3 gap-6')}>
			{projects.map((project) => (
				<AdminProjectCard project={project} key={project.id} />
			))}
		</div>
	)
}
