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
				'py-[8px] px-2 flex items-center bg-[#E0FD35] rounded-[5px]',
				'md:rounded-[10px]',
				'lg:py-4 lg:px-[15px] lg:rounded-[15px] ',
			)}
		>
			<Image
				src={workflow.icon}
				alt={workflow.title}
				width={103}
				height={103}
				className={twMerge(
					'w-[62px] h-[62px]',
					'md:w-[80px] md:h-[80px]',
					'lg:w-[103px] lg:h-[103px]',
				)}
			/>
			<div>
				<h6
					className={twMerge(
						'text-[16px] font-semibold',
						'md:text-[19px]',
						'lg:text-2xl',
						'xl:text-[32px]',
					)}
				>
					{workflow.title}
				</h6>
				<p
					className={twMerge(
						'mt-1 text-[12px] text-black/70 font-medium',
						'md:text-sm',
						'lg:text-[19px] ',
						'xl:text-[24px] ',
					)}
				>
					{workflow.label}
				</p>
			</div>
		</div>
	)
}
