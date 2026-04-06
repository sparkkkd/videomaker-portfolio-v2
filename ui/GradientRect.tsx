import { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

type GradientRectProps = {
	className?: string
	top?: number | string
	left?: number | string
	right?: number | string
	bottom?: number | string
	width?: number | string
	height?: number | string
	zIndex?: number
	delay?: number
}

export const GradientRect = ({
	className,
	top,
	left,
	right,
	bottom,
	width = '109px',
	height = '100%',
	zIndex = 0,
	delay = 0,
}: GradientRectProps) => {
	const style: CSSProperties = {
		top: typeof top === 'number' ? `${top}px` : top,
		left: typeof left === 'number' ? `${left}px` : left,
		right: typeof right === 'number' ? `${right}px` : right,
		bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
		width: typeof width === 'number' ? `${width}px` : width,
		height: typeof height === 'number' ? `${height}px` : height,
		zIndex,
	}

	return (
		<motion.div
			className={twMerge(
				'absolute bg-gradient-to-b from-transparent to-[#e0fd35] pointer-events-none',
				className,
			)}
			style={style}
			initial={{ scaleY: 0, originY: 1 }}
			animate={{
				scaleY: 1,
				originY: 1,
				transition: { duration: 0.6, ease: 'easeInOut', delay },
			}}
		/>
	)
}
