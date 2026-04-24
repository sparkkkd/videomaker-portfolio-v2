import { twMerge } from 'tailwind-merge'
import { ExperienceItem } from './experience.data'
import { TimelineDot } from './TimeLineDot'

interface TimelineContentProps {
	item: ExperienceItem
	isActive: boolean
}

export const TimelineContent = ({ item, isActive }: TimelineContentProps) => {
	return (
		<div
			className={twMerge(
				'relative flex gap-4',
				'sm-custom:gap-[30px]',
				'lg:gap-[110px]',
			)}
		>
			<TimelineDot isActive={isActive} />

			<div
				className={twMerge(
					'min-w-[66px] flex flex-col text-[12px] opacity-70 font-medium',
					'md:text-[14px] md:min-w-[76px]',
					'lg:text-[20px] lg:min-w-[110px]',
				)}
			>
				<span>{item.periodStart} —</span>
				<span>{item.periodEnd}</span>
			</div>

			<div className='w-full'>
				<h3
					className={twMerge(
						'text-base leading-none font-semibold',
						'md:text-xl',
						'lg:text-[32px]',
					)}
				>
					{item.title}
				</h3>

				<p
					className={twMerge(
						'mt-1 text-[12px] font-semibold',
						'md:text-base',
						'lg:mt-[10px] lg:text-[20px]',
					)}
				>
					{item.company}
				</p>

				<ul
					className={twMerge(
						'mt-2 w-full text-[12px]',
						'md:text-sm',
						'lg:mt-5 lg:text-[20px]',
					)}
				>
					{item.description.map((text, index) => (
						<li key={index} className='opacity-70'>
							{text}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
