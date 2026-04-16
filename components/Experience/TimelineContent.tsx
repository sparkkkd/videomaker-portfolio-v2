import { ExperienceItem } from './experience.data'
import { TimelineDot } from './TimeLineDot'

interface Props {
	item: ExperienceItem
	isActive: boolean
}

export const TimelineContent = ({ item, isActive }: Props) => {
	return (
		<div className='relative flex gap-[106px]'>
			<TimelineDot isActive={isActive} />

			<span className='max-w-[128px] text-[21px] opacity-70 font-medium'>
				{item.period}
			</span>

			<div>
				<h3 className='text-[36px] leading-none font-semibold'>{item.title}</h3>

				<p className='mt-[15px] font-semibold text-[18px]'>{item.company}</p>

				<ul className='mt-[14px] text-[18px]'>
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
