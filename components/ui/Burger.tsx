import { twMerge } from 'tailwind-merge'

interface BurgerProps {
	className?: string
	onClick: () => void
}

export const Burger = ({ className, onClick }: BurgerProps) => {
	return (
		<div
			className={twMerge(
				className,
				'w-[32px] h-[32px] flex flex-col justify-center gap-[3px] items-center bg-[#CDFA03] rounded-[10px]',
			)}
			onClick={onClick}
		>
			<span className='bg-[#000] w-[18px] h-[2px]' />
			<span className='bg-[#000] w-[18px] h-[2px]' />
			<span className='bg-[#000] w-[18px] h-[2px]' />
		</div>
	)
}
