import { twMerge } from 'tailwind-merge'

interface ContainerProps {
	children: React.ReactNode
	className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div
			className={twMerge(
				className,
				'mx-auto px-[10px]',
				'lg:max-w-full lg:px-[40px]',
				'xl:max-w-[1200px] xl:px-0',
			)}
		>
			{children}
		</div>
	)
}
