'use client'

import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface HeaderBackgroundProps {
	className?: string
}

export const HeaderBackground = ({ className }: HeaderBackgroundProps) => {
	const pathname = usePathname()
	const isResumePage = pathname === '/resume'

	if (!isResumePage) return null

	return (
		<div
			className={twMerge(
				'absolute inset-0 bg-[#141414] rounded-[17px] shadow-lg z-10',
				className,
			)}
		/>
	)
}
