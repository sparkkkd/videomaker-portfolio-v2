'use client'

import { motion } from 'framer-motion'

import { HeroCheckbox } from './HeroCheckbox'
import { fadeInUpDelay, staggerChildren } from '@/constants/animation.constant'
import { twMerge } from 'tailwind-merge'

interface HeroAnimatedContentProps {
	className?: string
}

export const HeroAnimatedContent = ({}: HeroAnimatedContentProps) => {
	return (
		<motion.div
			className={twMerge('max-w-full', 'mx-auto lg:max-w-[948px]')}
			variants={staggerChildren}
			initial='initial'
			animate='animate'
		>
			<motion.div
				className={twMerge(
					'text-[28px] text-center font-semibold leading-[95%]',
					'lg:text-[88px]',
				)}
				variants={fadeInUpDelay(0.6)}
			>
				<span>Оживляю</span> <HeroCheckbox />{' '}
				<span>смыслы через кадр, анимацию и визуальный ИИ</span>
			</motion.div>

			<motion.p
				className={twMerge(
					'mt-[15px] text-[12px] max-w-[245px]',
					'lg:mt-[42px] mx-auto lg:max-w-[843px] text-center lg:text-4xl',
				)}
				variants={fadeInUpDelay(0.9)}
			>
				От первого драфта сценария до финального монтажа. Короткометражное кино,
				музыкальные клипы и стильная анимация.
			</motion.p>
			<motion.button
				className={twMerge(
					'mt-[50px] w-full h-[40px] flex justify-center items-center font-semibold text-black rounded-[10px] bg-[linear-gradient(180deg,#f5ffba_0%,#fff_100%)] relative z-10',
					'lg:mt-[106px] lg:h-[109px] lg:text-[32px] lg:rounded-[25px]',
				)}
				variants={fadeInUpDelay(1.1)}
			>
				Посмотреть шоурил
			</motion.button>
		</motion.div>
	)
}
