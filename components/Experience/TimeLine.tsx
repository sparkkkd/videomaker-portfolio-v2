import { twMerge } from 'tailwind-merge'

export const Timeline = () => {
	return (
		<div
			className={twMerge(
				'mt-[32px] h-[84%] relative',
				'lg:h-[86%]',
				'xl:mt-[40px]',
			)}
		>
			<div
				className={twMerge(
					'w-[2px] h-full absolute top-0 left-1/2 -translate-x-1/2 bg-[#E0FD35]',
					'md:right-0 md:left-auto',
					'xl:left-1/2 xl:w-1',
				)}
			/>
		</div>
	)
}
