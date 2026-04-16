// components/Hero/AnimatedHeroContent.tsx
'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { twMerge } from 'tailwind-merge'

interface AnimatedHeroContentProps {
	className?: string
}

// Варианты анимации для текста
const textVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: 1, // Начинаем после заголовка
		},
	},
}

// Варианты анимации для кнопки
const buttonVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: 1.4, // Чуть позже текста
		},
	},
}

export const AnimatedHeroContent = ({
	className,
}: AnimatedHeroContentProps) => {
	return (
		<div
			className={twMerge(
				'px-5 mt-[30px] flex flex-col gap-[35px]',
				'lg:mt-10 lg:pl-[50px] lg:pr-[40px] lg:items-center lg:flex-row lg:gap-0 lg:justify-between',
				'xl:p-0',
				className,
			)}
		>
			{/* Текст с анимацией */}
			<motion.p
				className={twMerge(
					'text-[18px] text-center text-white leading-[120%]',
					'lg:basis-[60%] lg:text-[24px] lg:text-left',
					'xl:text-[32px] xl:basis-[70%]',
				)}
				variants={textVariants}
				initial='hidden'
				animate='visible'
			>
				От концепта до рендера: cтильная анимация, короткометражки и
				коммерческие видеопроекты
			</motion.p>

			{/* Кнопка с анимацией */}
			<motion.div
				className='lg:basis-[35%] xl:basis-[40%]'
				variants={buttonVariants}
				initial='hidden'
				animate='visible'
			>
				<Button>Связаться со мной</Button>
			</motion.div>
		</div>
	)
}
