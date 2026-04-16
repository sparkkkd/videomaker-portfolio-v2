'use client'

import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface AnimatedTitleProps {
	text: string
	className?: string
}

export const AnimatedHeroTitle = ({ text, className }: AnimatedTitleProps) => {
	// 1. Разбиваем текст на слова
	const words = text.split(' ')
	let globalIndex = 0 // Глобальный счетчик для расчета задержки

	return (
		<motion.h1
			className={twMerge(
				// Flex-wrap разрешает перенос строк
				'flex flex-wrap justify-center items-start gap-x-[5px]',
				'text-[56px] text-white font-druk text-center leading-[96%] uppercase',
				'md:text-[72px] md:gap-x-[10px]',
				'lg:text-[136px] lg:gap-x-[15px]',
				'xl:text-[179px] xl:gap-x-[19px]',
				className,
			)}
			initial='hidden'
			animate='visible'
			aria-hidden='true'
		>
			{words.map((word, wIndex) => (
				// 2. Обертка слова: inline-block позволяет переносить строку ПОСЛЕ слова
				<span key={wIndex} className='inline-block whitespace-nowrap'>
					{word.split('').map((char) => {
						const currentIndex = globalIndex++

						return (
							// 3. Контейнер буквы: обрезает (overflow-hidden)
							<span
								key={currentIndex}
								className='inline-block overflow-hidden align-bottom'
							>
								<motion.span
									className='inline-block'
									initial={{ y: '110%' }} // Спрятана ниже
									animate={{ y: 0 }} // Выезжает на место
									transition={{
										type: 'spring',
										damping: 12,
										stiffness: 100,
										// 4. Ручной стаггер: задержка зависит от позиции буквы во всем тексте
										delay: currentIndex * 0.05,
									}}
								>
									{/* Неразрывный пробел, если символ — пробел, чтобы верстка не схлопывалась */}
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
