'use client'

import { motion } from 'framer-motion'
import { Tag } from '../ui/Tag'
import { fadeInUpBlur, scaleXAnimation } from '@/constants/animation.constant'
import { twMerge } from 'tailwind-merge'

interface AnimatedIntroTagsProps {
	className?: string
}

const TAGS: { label: string; className: string }[] = [
	{
		label: 'Проектное сотрудничество',
		className: 'absolute left-[5%] top-[-2%]',
	},
	{
		label: 'Удаленная работа',
		className: 'absolute right-[14%] top-[30%]',
	},
	{
		label: 'г. Рязань',
		className: 'absolute left-[26%] bottom-[26%] rotate-[-2deg]',
	},
]

const SCALE_DURATION = 0.6

export const AnimatedIntroTags = ({ className }: AnimatedIntroTagsProps) => {
	return (
		<div className={className}>
			{TAGS.map((tag, index) => {
				const baseDelay = 0.9 + index * 0.3
				const labelDelay = baseDelay + SCALE_DURATION * 0.6

				return (
					<motion.div
						key={index}
						className={twMerge(
							tag.className,
							'bg-[#CDFA03] rounded-full shadow-[6px_6px_30px_0px_rgba(0,0,0,0.33)] overflow-hidden',
						)}
						variants={scaleXAnimation(baseDelay, SCALE_DURATION)}
						initial='initial'
						animate='animate'
					>
						<motion.div
							variants={fadeInUpBlur(0.6, 5, labelDelay)}
							initial='initial'
							animate='animate'
						>
							<Tag label={tag.label} className='!bg-transparent !shadow-none' />
						</motion.div>
					</motion.div>
				)
			})}
		</div>
	)
}
