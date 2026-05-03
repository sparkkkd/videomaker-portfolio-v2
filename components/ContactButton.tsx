import { twMerge } from 'tailwind-merge'

interface ContactButtonProps {
	className?: string
}

export const ContactButton = ({ className }: ContactButtonProps) => {
	return (
		<button
			className={twMerge(
				className,
				'w-full h-[40px] flex items-center justify-center font-semibold leading-none bg-white text-black rounded-[10px] text-[14px] transition-colors duration-300 hover:bg-[#8F8F8F]',
				'lg:h-[139px] lg:text-[32px] lg:rounded-[37px]',
			)}
		>
			Обсудить проект
		</button>
	)
}
