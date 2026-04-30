'use client'

import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface AnimatedTitleProps {
	text: string
	className?: string
}

export const AnimatedHeroTitle = ({ text, className }: AnimatedTitleProps) => {
	const words = text.split(' ')
	let globalIndex = 0

	return (
		<motion.h1
			className={twMerge(
				'flex flex-wrap justify-center items-start gap-x-[5px]',
				'text-[56px] text-white font-druk text-center leading-[96%] uppercase',
				'md:text-[72px] md:gap-x-[10px]',
				'lg:max-w-[854px] lg:mx-auto lg:text-[136px] lg:gap-x-[15px]',
				'xl:max-w-full xl:text-[179px] xl:gap-x-[19px]',
				className,
			)}
			initial='hidden'
			animate='visible'
			aria-hidden='true'
		>
			{words.map((word, wIndex) => (
				<span key={wIndex} className='inline-block whitespace-nowrap'>
					{word.split('').map((char) => {
						const currentIndex = globalIndex++

						return (
							<span
								key={currentIndex}
								className='inline-block overflow-hidden align-bottom'
							>
								<motion.span
									className='inline-block'
									initial={{ y: '110%' }}
									animate={{ y: 0 }}
									transition={{
										type: 'spring',
										damping: 12,
										stiffness: 100,
										delay: currentIndex * 0.03,
									}}
								>
									{char === ' ' ? '\u00A0' : char}
								</motion.span>
							</span>
						)
					})}
				</span>
			))}
		</motion.h1>
	)
}
