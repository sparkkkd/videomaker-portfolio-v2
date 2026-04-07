import { RegularWorkflow } from '@/constants/workflow.constant'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface WorkflowCardProps {
	className?: string
	workflow: RegularWorkflow
}

export const WorkflowCard = ({ className, workflow }: WorkflowCardProps) => {
	return (
		<div
			className={twMerge(
				className,
				'py-[10px] px-[15px] flex items-center rounded-[15px] bg-[#e0fd35]',
			)}
		>
			<Image
				src={workflow.icon}
				alt={workflow.title}
				width={103}
				height={103}
			/>
			<div>
				<h6 className='font-semibold text-[32px]'>{workflow.title}</h6>
				<p className='text-black/70 text-[24px] font-medium'>
					{workflow.label}
				</p>
			</div>
		</div>
	)
}
