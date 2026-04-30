'use client'

import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

interface FloatingIconProps {
	src: string
	alt: string
	width?: number
	height?: number
	fill?: boolean
	className?: string
	imageClassName?: string
	delay?: number
	duration?: number
	yRange?: [number, number]
}

export const FloatingIcon = ({
	src,
	alt,
	width = 100,
	height = 100,
	fill = false,
	className,
	imageClassName,
	delay = 0,
	duration = 3,
	yRange = [0, -15],
}: FloatingIconProps) => {
	const floatKeyframes = [yRange[0], yRange[1], yRange[0]]

	return (
		<motion.div
			className={twMerge('', className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				ease: 'easeOut',
				delay,
			}}
		>
			<motion.div
				animate={{ y: floatKeyframes }}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: 'loop',
					ease: 'easeInOut',
				}}
				className='w-full h-full'
			>
				{fill ? (
					<Image
						src={src}
						alt={alt}
						fill
						className={twMerge('object-contain', imageClassName)}
					/>
				) : (
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						className={imageClassName}
					/>
				)}
			</motion.div>
		</motion.div>
	)
}
