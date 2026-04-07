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
			<h3 className='font-semibold text-center text-[64px] leading-[90%]'>
				Мой инструментарий
			</h3>

			<div className='mt-10 grid grid-cols-2 gap-5'>
				{WORKFLOW.map((item) => {
					if (item.isAI) {
						return (
							<AIWorkflowCard
								className='row-span-2'
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
