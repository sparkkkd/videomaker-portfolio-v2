import { experience } from './experience.data'
import { TimelineDot } from './TimeLineDot'

export const Timeline = () => {
	return (
		<div className='mt-[23px] relative flex justify-center h-full'>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[89%] bg-[#E0FD35]' />

			<div className='relative flex flex-col justify-between h-[89%]'>
				{experience.map((_, index) => (
					<TimelineDot key={index} isActive={index === experience.length - 1} />
				))}
			</div>
		</div>
	)
}
