import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { ProjectTabsAndContent } from '@/features/ProjectTabsAndContent'

interface ProjectSectionProps {
	className?: string
}

export const ProjectSection = ({ className }: ProjectSectionProps) => {
	return (
		<section className={twMerge(className, 'relative z-20')}>
			<div
				className={twMerge(
					' pt-[30px] pb-[40px] bg-[#1C1C1C] rounded-[10px]',
					' lg:pt-[105px] lg:pb-[100px] lg:rounded-[80px]',
					'bg-[url(/star-2.svg)] bg-center bg-no-repeat bg-[length:clamp(1236px,687.69px+152.3vw,2820px)]',
				)}
			>
				<Container>
					<h3
						className={twMerge(
							'text-center text-[28px] text-white font-semibold',
							'md:text-[64px]',
							'lg:text-[80px]',
						)}
					>
						Проекты
					</h3>
					<ProjectTabsAndContent />
				</Container>
			</div>
		</section>
	)
}
