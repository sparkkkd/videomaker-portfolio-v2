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
				'w-[35px] h-[20px] inline-block rounded-full shadow-[inset_0_0_9px_0_#000] cursor-pointer transition-all duration-300',
				'relative lg:mb-[-7px] lg:w-[111px] lg:h-[63px]',
				`${isActive ? 'bg-[#e0fd35]' : 'bg-[#fff]'}`,
			)}
			onClick={() => setIsActive((prev) => !prev)}
		>
			<div
				className={twMerge(
					`w-[15px] h-[15px] absolute top-1/2 -translate-y-1/2 bg-black rounded-full transition-all duration-300`,
					`lg:w-[49px] lg:h-[49px] 
					${!isActive ? 'left-[3px] lg:left-[10px]' : 'left-[17px] lg:left-[52px]'}
					`,
				)}
			></div>
		</div>
	)
}
