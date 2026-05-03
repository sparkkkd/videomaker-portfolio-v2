import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { Education } from '@/features/Education'
import { Workflow } from '@/features/Workflow'

interface WorkflowEducationSectionProps {
	className?: string
}

export const WorkflowEducationSection = ({
	className,
}: WorkflowEducationSectionProps) => {
	return (
		<section className={twMerge(className, 'relative z-20')}>
			<div
				className={twMerge(
					'pt-[25px] pb-[33px] bg-white rounded-[15px] relative z-0',
					'md:pt-10 pb-[40px]',
					'lg:pt-[100px] lg:pb-[50px] lg:rounded-[80px]',
				)}
			>
				<div
					className={twMerge(
						'absolute inset-0 z-[1]',
						'bg-[url(/star-black.svg)] bg-center bg-no-repeat bg-[length:clamp(1236px,687.69px+152.3vw,2820px)]',
					)}
				/>
				<Container className='relative z-[2]'>
					<Workflow />
					<Education />
				</Container>
			</div>
		</section>
	)
}
