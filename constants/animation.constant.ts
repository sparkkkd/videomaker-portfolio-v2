import { Variants } from 'framer-motion'

export const staggerChildren = {
	animate: { transition: { staggerChildren: 0.3 } },
}

export const fadeInUp: Variants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeInUpDelay = (delay: number): Variants => ({
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeOut', delay },
	},
})
