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
				'pt-[23px] pb-[32px] px-[32px] relative bg-[#1c1c1c] rounded-[15px] overflow-hidden',
			)}
		>
			<h6 className='relative z-10 text-[32px] font-semibold leading-[120%] text-white'>
				{workflow.title}
			</h6>

			<div className='mt-[66px] max-w-[334px] relative z-10 grid grid-cols-2 gap-x-4'>
				{workflow.tools.map((item, idx) => (
					<div key={idx} className='flex items-center gap-[10px]'>
						<span className='w-[6px] h-[6px] rounded-full bg-white/70' />
						<span className='text-[20px] text-white/70'>{item}</span>
					</div>
				))}
			</div>

			<Image
				src='/workflow-card-bg.svg'
				alt=''
				width={245}
				height={215}
				className='absolute right-[0px] bottom-[0px] z-[1]'
			/>
		</div>
	)
}
