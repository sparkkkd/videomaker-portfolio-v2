import { twMerge } from 'tailwind-merge'

interface TimelineDotProps {
	isActive?: boolean
	index?: number
}

export const TimelineDot = ({ isActive, index }: TimelineDotProps) => {
	return (
		<div
			className={twMerge(
				'absolute left-[-37px] top-[8px] flex items-center justify-center z-10',
				'sm-custom:left-[-51px]',
				'md:left-[-52px]',
				'lg:left-[-58px]',
				'xl:left-[-129px]',
				index && index === 0 && 'top-0',
			)}
		>
			<div
				className={twMerge(
					'w-[13px] h-[13px] rounded-full',
					'md:w-5 md:h-5',
					'xl:w-8 xl:h-8',
					isActive
						? 'bg-[#E0FD35] shadow-[0_0_20px_#E0FD35]'
						: 'border-2 xl:border-[4px] border-[#E0FD35] bg-[#1C1C1C]',
				)}
			/>
		</div>
	)
}
