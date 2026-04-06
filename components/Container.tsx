import { twMerge } from 'tailwind-merge'

interface ContainerProps {
	children: React.ReactNode
	className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div className={twMerge(className, 'max-w-[1200px] mx-auto')}>
			{children}
		</div>
	)
}
