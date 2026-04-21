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

export const fadeInUpBlur = (
	duration: number,
	blur: number,
	delay?: number,
): Variants => ({
	initial: { opacity: 0, y: 30, filter: `blur(${blur}px)` },
	animate: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration,
			ease: 'easeOut',
			...(delay !== undefined && { delay }),
		},
	},
})

export const scaleXAnimation = (delay: number, duration: number): Variants => ({
	initial: { scaleX: 0, originX: 0.5 },
	animate: {
		scaleX: 1,
		originX: 0.5,
		transition: { duration, delay, ease: 'easeOut' },
	},
})

export const slideInOut = () => {
	document.documentElement.animate(
		[
			{
				opacity: 1,
				transform: 'translateY(0) scale(1)',
			},
			{
				opacity: 0,
				transform: 'translateY(-35%)',
			},
		],
		{
			duration: 1500,
			easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-old(root)',
		},
	)

	document.documentElement.animate(
		[
			{
				clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
			},
			{
				clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
			},
		],
		{
			duration: 1500,
			easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)',
		},
	)
}
