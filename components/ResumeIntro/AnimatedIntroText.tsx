'use client'

import { fadeInUpBlur } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

interface AnimatedIntroTextProps {
	className?: string
	delay?: number
}

export const AnimatedIntroText = ({
	className,
	delay = 0,
}: AnimatedIntroTextProps) => {
	return (
		<motion.div
			className={twMerge(className)}
			initial='initial'
			animate='animate'
			variants={fadeInUpBlur(0.6, 10, delay)}
			style={{ transitionDelay: `${delay}ms` }}
		>
			<div className='flex items-center justify-center gap-[5px]'>
				<Image
					src='/avatar.png'
					alt='Дмитрий'
					width={24}
					height={24}
					className='rounded-full'
				/>
				<p className='text-[clamp(10px,calc(1.09vw_+_6.5px),24px)] text-black/60 font-semibold'>
					Привет! Меня зовут Дмитрий Кузьмин и я
				</p>
			</div>
		</motion.div>
	)
}
