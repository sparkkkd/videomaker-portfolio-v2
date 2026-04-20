import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

import { fadeInUpBlur } from '@/constants/animation.constant'
import { Button } from '../ui/Button'

interface AnimatedIntroButtonsProps {
	className?: string
}

export const AnimatedIntroButtons = ({
	className,
}: AnimatedIntroButtonsProps) => {
	return (
		<motion.div
			className={twMerge(
				className,
				'px-[18px] mt-8',
				'md:flex md:gap-[30px] md:mt-[55px]',
			)}
			initial='initial'
			animate='animate'
			variants={fadeInUpBlur(0.6, 5, 0.6)}
		>
			<Button className='!text-primary' variant='black'>
				Связаться со мной
			</Button>
			<Button className={twMerge('mt-[15px]', 'md:mt-0')} outline>
				Скачать PDF-резюме
			</Button>
		</motion.div>
	)
}
