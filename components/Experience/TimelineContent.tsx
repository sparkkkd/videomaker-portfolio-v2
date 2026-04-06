import { ExperienceItem } from './experience.data'

interface Props {
	item: ExperienceItem
}

export const TimelineContent = ({ item }: Props) => {
	return (
		<div className='flex gap-[106px]'>
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
