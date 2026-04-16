interface Props {
	isActive?: boolean
}

export const TimelineDot = ({ isActive }: Props) => {
	return (
		<div className='absolute top-0 left-[-98px] z-10 flex items-center justify-center'>
			{isActive ? (
				<div className='w-8 h-8 rounded-full bg-[#E0FD35] shadow-[0_0_20px_#E0FD35]' />
			) : (
				<div className='w-8 h-8 rounded-full border-2 border-[#E0FD35] bg-[#1C1C1C]' />
			)}
		</div>
	)
}
