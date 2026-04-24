import { AIWorkflow } from '@/constants/workflow.constant'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface AIWorkflowCardProps {
	className?: string
	workflow: AIWorkflow
}

export const AIWorkflowCard = ({
	workflow,
	className,
}: AIWorkflowCardProps) => {
	return (
		<div
			className={twMerge(
				className,
				'py-3 px-3 overflow-hidden relative rounded-[10px] bg-[#1c1c1c]',
				'md:py-4 md:px-4 md:rounded-[10px]',
				'lg:py-[20px] lg:px-[23px] lg:rounded-[15px] ',
				'xl:pt-[23px] xl:pb-[32px] xl:px-[32px] xl:flex xl:flex-col xl:justify-between',
			)}
		>
			<h6
				className={twMerge(
					'ml-1 relative z-10 text-[16px] font-semibold leading-[120%] text-white',
					'md:text-[19px]',
					'lg:ml-0 lg:text-2xl',
					'xl:ml-0 xl:text-[32px]',
				)}
			>
				{workflow.title}
			</h6>

			<div
				className={twMerge(
					'mt-[5px] max-w-[200px] grid grid-cols-2 gap-[1px] relative z-10',
					'md:mt-2 md:max-w-[300px]',
					'lg:mt-5 lg:max-w-[300px]',
					'xl:mt-auto xl:max-w-[334px] xl:gap-x-4',
				)}
			>
				{workflow.tools.map((item, idx) => (
					<div
						key={idx}
						className={twMerge('flex items-center gap-[5px]', 'lg:gap-[10px]')}
					>
						<span
							className={twMerge(
								'w-1 h-1 rounded-full bg-white/70',
								'lg:w-[6px] lg:h-[6px]',
							)}
						/>
						<span
							className={twMerge(
								'text-[12px] text-white/70',
								'md:text-sm',
								'lg:text-base',
								'xl:text-[20px]',
							)}
						>
							{item}
						</span>
					</div>
				))}
			</div>

			<Image
				src='/workflow-card-bg.svg'
				alt=''
				width={245}
				height={215}
				className={twMerge(
					'w-[134px] h-[124px] absolute right-[0px] bottom-[-21px] z-[1]',
					'md:w-[205px] md:h-[175px] md:bottom-[-24px]',
					'lg:bottom-[0px]',
					'xl:w-[245px] xl:h-[215px]',
				)}
			/>
		</div>
	)
}
