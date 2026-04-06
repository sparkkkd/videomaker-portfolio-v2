'use client'

import { motion } from 'framer-motion'

import { HeroCheckbox } from './HeroCheckbox'
import { fadeInUpDelay, staggerChildren } from '@/constants/animation.constant'

interface HeroAnimatedContentProps {
	className?: string
}

export const HeroAnimatedContent = ({}: HeroAnimatedContentProps) => {
	return (
		<motion.div
			className='mx-auto max-w-[948px]'
			variants={staggerChildren}
			initial='initial'
			animate='animate'
		>
			<motion.div
				className='text-[88px] text-center font-semibold leading-[95%]'
				variants={fadeInUpDelay(0.6)}
			>
				<span>Оживляю</span> <HeroCheckbox />{' '}
				<span>смыслы через кадр, анимацию и визуальный ИИ</span>
			</motion.div>

			<motion.p
				className='mt-[42px] mx-auto max-w-[843px] text-center text-4xl'
				variants={fadeInUpDelay(0.9)}
			>
				От первого драфта сценария до финального монтажа. Короткометражное кино,
				музыкальные клипы и стильная анимация.
			</motion.p>

			<motion.button
				className='mt-[106px] w-full h-[109px] flex justify-center items-center bg-gradient-to-b from-[#161a00] to-black font-semibold text-[32px] rounded-[25px] relative z-10'
				variants={fadeInUpDelay(1.1)}
			>
				Посмотреть шоурил
			</motion.button>
		</motion.div>
	)
}
