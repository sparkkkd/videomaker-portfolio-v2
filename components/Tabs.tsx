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
				'mx-auto max-w-[228px] flex flex-wrap items-center  gap-[10px] justify-center',
				'lg:px-[30px] lg:gap-[25px] lg:justify-between lg:max-w-full',
			)}
		>
			{tabs.map(({ label, id }) => (
				<div
					key={id}
					className={twMerge(
						'py-[6px] px-[9px] rounded-[4px] text-[10px] text-white font-semibold leading-[90%] border-1 border-[#e0fd35] transition-all duration-300 cursor-pointer',
						'lg:py-[15px] lg:px-5 lg:text-2xl lg:rounded-[10px]',
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
