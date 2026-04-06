import { twMerge } from 'tailwind-merge'

interface ContactButtonProps {
	className?: string
}

export const ContactButton = ({ className }: ContactButtonProps) => {
	return (
		<button
			className={twMerge(
				className,
				'w-full h-[139px] flex items-center justify-center font-semibold text-[32px] bg-white rounded-[37px] leading-none hover:scale-[0.98] transition-all duration-300',
			)}
		>
			Обсудить проект
		</button>
	)
}
