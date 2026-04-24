import { AIWorkflowCard } from '@/components/AIWorkflowCard'
import { WorkflowCard } from '@/components/WorkflowCard'
import { WORKFLOW } from '@/constants/workflow.constant'
import { twMerge } from 'tailwind-merge'

interface WorkflowProps {
	className?: string
}

export const Workflow = ({ className }: WorkflowProps) => {
	return (
		<div className={twMerge(className, '')}>
			<h3
				className={twMerge(
					'font-semibold text-center text-2xl leading-[90%]',
					'md:text-[42px]',
					'lg:text-[64px]',
				)}
			>
				Мой инструментарий
			</h3>

			<div
				className={twMerge(
					'mt-5 grid grid-cols-1 gap-[10px]',
					'md:gap-4',
					'lg:mt-[50px] lg:grid-cols-2 lg:gap-5',
				)}
			>
				{WORKFLOW.map((item) => {
					if (item.isAI) {
						return (
							<AIWorkflowCard
								className='row-span-2 order-last lg:order-none'
								workflow={item}
								key={item.id}
							/>
						)
					}

					return <WorkflowCard workflow={item} key={item.id} />
				})}
			</div>
		</div>
	)
}
