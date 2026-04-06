'use client'

import { twMerge } from 'tailwind-merge'

interface TabsProps {
	className?: string
	tabs: { id: string; label: string }[]
	activeTabId: string
	onTabChange: (id: string) => void
}

export const Tabs = ({
	className,
	tabs,
	activeTabId,
	onTabChange,
}: TabsProps) => {
	return (
		<div
			className={twMerge(
				className,
				'mx-auto px-[30px] flex items-center justify-between gap-[25px]',
			)}
		>
			{tabs.map(({ label, id }) => (
				<div
					key={id}
					className={twMerge(
						'py-[15px] px-5 text-white font-semibold text-2xl leading-[90%] border-1 border-[#e0fd35] rounded-[10px] transition-all duration-300 cursor-pointer',
						id === activeTabId ? 'bg-[#E0FD35] text-black' : 'bg-transparent',
					)}
					onClick={() => onTabChange(id)}
				>
					{label}
				</div>
			))}
		</div>
	)
}
