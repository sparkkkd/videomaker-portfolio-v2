'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'

const HERO_ICONS = [
	{
		src: '/hero-left.svg',
		alt: '',
		width: 172,
		height: 172,
		className: 'hidden lg:block absolute top-[150px] left-[-85px] z-10',
		baseRotate: -12,
		floatY: [0, -15, 0],
		floatRotate: [-12, -9, -12],
		floatDuration: 4,
		floatDelay: 0,
		entranceDelay: 0,
	},
	{
		src: '/hero-right-top.svg',
		alt: '',
		width: 130,
		height: 130,
		className: 'hidden lg:block absolute right-[35px] top-[-30px] z-10',
		baseRotate: -8,
		floatY: [0, -10, 0],
		floatRotate: [-8, -5, -8],
		floatDuration: 3.5,
		floatDelay: 0.5,
		entranceDelay: 0.1,
	},
	{
		src: '/hero-right-bottom.svg',
		alt: '',
		width: 206,
		height: 206,
		className: 'hidden lg:block absolute bottom-[227px] right-[-82px] z-10',
		baseRotate: 10,
		floatY: [0, -20, 0],
		floatRotate: [10, 13, 10],
		floatDuration: 4.5,
		floatDelay: 1,
		entranceDelay: 0.2,
	},
]

// Отдельный компонент для каждой иконки
const AnimatedIcon = ({
	src,
	alt,
	width,
	height,
	className,
	baseRotate,
	floatY,
	floatRotate,
	floatDuration,
	floatDelay,
	entranceDelay,
}: (typeof HERO_ICONS)[number]) => {
	const controls = useAnimation()

	useEffect(() => {
		const animateSequence = async () => {
			await controls.start({
				opacity: 1,
				y: 0,
				rotate: baseRotate,
				transition: {
					duration: 0.6,
					ease: 'easeOut',
					delay: entranceDelay,
				},
			})

			controls.start({
				y: floatY,
				rotate: floatRotate,
				transition: {
					duration: floatDuration,
					delay: floatDelay,
					ease: 'easeInOut',
					repeat: Infinity,
					repeatType: 'reverse',
				},
			})
		}

		animateSequence()
	}, [
		controls,
		baseRotate,
		floatY,
		floatRotate,
		floatDuration,
		floatDelay,
		entranceDelay,
	])

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={controls}
			className={className}
			style={{
				willChange: 'transform',
				transformOrigin: 'center center',
			}}
		>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={false}
			/>
		</motion.div>
	)
}

export const AnimatedHeroIcons = () => {
	return (
		<>
			{HERO_ICONS.map((icon, index) => (
				<AnimatedIcon key={index} {...icon} />
			))}
		</>
	)
}
