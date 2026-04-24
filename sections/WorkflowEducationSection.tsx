import { Container } from '@/components/Container'
import { Education } from '@/features/Education'
import { Workflow } from '@/features/Workflow'
import { twMerge } from 'tailwind-merge'

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
					'pt-[25px] pb-[33px] bg-white rounded-[15px]',
					'md:pt-10 pb-[40px]',
					'lg:pt-[100px] lg:pb-[50px] lg:rounded-[80px]',
				)}
			>
				<Container>
					<Workflow />
					<Education />
				</Container>
			</div>
		</section>
	)
}
