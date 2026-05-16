import { twMerge } from 'tailwind-merge'

interface LoaderProps {
	className?: string
	size?: 'sm' | 'md' | 'lg'
}

export const Loader = ({ className, size = 'lg' }: LoaderProps) => {
	return (
		<div
			className={twMerge(
				'absolute left-1/2 top-1/2 -translate-1/2 animate-spin rounded-full border-accent border-t-transparent',
				size === 'sm' && 'h-6 w-6 border',
				size === 'md' && 'h-8 w-8 border-2',
				size === 'lg' && 'h-12 w-12 border-4',
				className,
			)}
		/>
	)
}
