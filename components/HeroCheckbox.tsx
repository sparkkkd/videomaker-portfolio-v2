'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface HeroCheckboxProps {
	className?: string
}

export const HeroCheckbox = ({ className }: HeroCheckboxProps) => {
	const [isActive, setIsActive] = useState<boolean>(true)

	return (
		<div
			className={twMerge(
				className,
				'relative mb-[-7px] w-[111px] h-[63px] inline-block  rounded-full shadow-[inset_0_0_9px_0_#000] cursor-pointer transition-all duration-300',
				`${isActive ? 'bg-[#e0fd35]' : 'bg-[#fff]'}`,
			)}
			onClick={() => setIsActive((prev) => !prev)}
		>
			<div
				className={`w-[49px] h-[49px] absolute top-1/2 -translate-y-1/2 bg-black rounded-full ${!isActive ? 'left-[10px]' : 'left-[52px]'} transition-all duration-300`}
			></div>
		</div>
	)
}
