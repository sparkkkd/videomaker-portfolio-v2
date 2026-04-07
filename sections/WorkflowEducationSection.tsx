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
		<section className={twMerge(className, 'relative z-20 bg-[#D6FA03]')}>
			<div className='py-[100px] bg-white rounded-[80px]'>
				<Container>
					<Workflow />
					<Education />
				</Container>
			</div>
		</section>
	)
}
