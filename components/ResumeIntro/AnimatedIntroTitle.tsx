'use client'

import { fadeInUpBlur } from '@/constants/animation.constant'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface AnimatedTextProps {
	lines: string[]
	className?: string
	lineClassName?: string
}

export const AnimatedTitle = ({
	lines,
	className,
	lineClassName,
}: AnimatedTextProps) => {
	return (
		<motion.div
			className={twMerge(
				'flex flex-col font-druk text-[56px] leading-[96%] text-secondary uppercase text-center relative',
				className,
			)}
			style={{ fontSize: 'clamp(56px, calc(9.6vw + 25px), 179px)' }}
			initial='initial'
			animate='animate'
			variants={{
				initial: {},
				animate: {
					transition: {
						staggerChildren: 0.15,
						delayChildren: 0.2,
					},
				},
			}}
		>
			{lines.map((line, i) => (
				<motion.div
					key={i}
					variants={fadeInUpBlur(0.6, 10)}
					className={lineClassName}
				>
					{line}
				</motion.div>
			))}
		</motion.div>
	)
}
