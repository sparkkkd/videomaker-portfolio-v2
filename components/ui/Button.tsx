import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	className?: string
	children: React.ReactNode
	variant?: 'white' | 'black'
	fullWidth?: boolean
}

export const Button = ({
	className,
	children,
	variant = 'white',
	fullWidth = true,
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				className,
				'flex items-center justify-center rounded-[10px] py-[15px] text-[18px] font-semibold',
				'lg:py-[20px] lg:rounded-[100px] lg:text-[24px]',
				'xl:py-[30px] xl:text-[32px]',
				fullWidth && 'w-full',
				variant === 'white' && 'text-[#1C1C1C] bg-white',
				variant === 'black' && 'text-white bg-[#000]',
			)}
		>
			{children}
		</button>
	)
}
