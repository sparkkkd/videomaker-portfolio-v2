import { twMerge } from 'tailwind-merge'

interface ContactButtonProps {
	className?: string
}

export const ContactButton = ({ className }: ContactButtonProps) => {
	return (
		<button
			className={twMerge(
				className,
				'w-full h-[40px] flex items-center justify-center font-semibold leading-none bg-[linear-gradient(180deg,#f5ffba_0%,#fff_100%)] rounded-[10px] text-[14px]',
				'lg:h-[139px] lg:text-[32px] lg:rounded-[37px] lg:hover:scale-[0.98] lg:transition-all lg:duration-300',
			)}
		>
			Обсудить проект
		</button>
	)
}
