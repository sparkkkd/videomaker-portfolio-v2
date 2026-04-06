import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { ProjectTabsAndContent } from '@/features/ProjectTabsAndContent'

interface ProjectSectionProps {
	className?: string
}

export const ProjectSection = ({ className }: ProjectSectionProps) => {
	return (
		<section className={twMerge(className, 'relative z-10')}>
			<div className='mt-[128px] pt-[105px] pb-[100px] bg-[#1C1C1C] rounded-[80px]'>
				<Container>
					<h3 className='text-center text-[80px] text-white font-semibold'>
						Проекты
					</h3>
					<ProjectTabsAndContent />
				</Container>
			</div>
		</section>
	)
}
