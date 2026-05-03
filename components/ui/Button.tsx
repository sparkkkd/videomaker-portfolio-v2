import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	className?: string
	children: React.ReactNode
	variant?: 'white' | 'black'
	fullWidth?: boolean
	outline?: boolean
}

export const Button = ({
	className,
	children,
	variant = 'white',
	fullWidth = true,
	outline = false,
}: ButtonProps) => {
	return (
		<button
			className={twMerge(
				className,
				'flex items-center justify-center rounded-[10px] py-[15px] text-[18px] font-semibold transition-colors duration-300',
				'lg:py-[20px] lg:rounded-[100px] lg:text-[24px]',
				'xl:text-[32px]',
				fullWidth && 'w-full',
				variant === 'white' && 'text-[#1C1C1C] bg-white hover:bg-[#8F8F8F]',
				variant === 'black' &&
					'text-white bg-[#000] hover:bg-white hover:text-black',
				outline && 'border border-black bg-white hover:border-transparent',
			)}
		>
			{children}
		</button>
	)
}
