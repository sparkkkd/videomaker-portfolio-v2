import { twMerge } from 'tailwind-merge'

interface LoaderProps {
	className?: string
}

export const Loader = ({ className }: LoaderProps) => {
	return (
		<div
			className={twMerge(
				'absolute left-1/2 top-1/2 -translate-1/2 animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent',
			)}
		/>
	)
}
