import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

type GradientRectProps = {
	className?: string
	zIndex?: number
	delay?: number
}

export const GradientRect = ({ className, delay = 0 }: GradientRectProps) => {
	return (
		<motion.div
			className={twMerge(
				className,
				'w-[29px] z-0 flex-1',
				'bg-gradient-to-b from-transparent to-[#e0fd35] pointer-events-none',
				'lg:w-[109px]',
			)}
			initial={{ scaleY: 0, originY: 1 }}
			animate={{
				scaleY: 1,
				originY: 1,
				transition: { duration: 0.6, ease: 'easeInOut', delay },
			}}
		/>
	)
}
