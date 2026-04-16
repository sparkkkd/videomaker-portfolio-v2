'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface IconConfig {
	src: string
	alt: string
	width: number
	height: number
	className: string
	floatAmplitude: number
	floatDuration: number
	entranceDelay: number
}

const ICONS: IconConfig[] = [
	{
		src: '/hero-left.svg',
		alt: 'hero-left',
		width: 40,
		height: 40,
		className:
			'absolute left-[-8%] bottom-[-15%] md:w-[70px] md:h-[60px] lg:w-[90px] lg:h-[90px] lg:bottom-[-4%] lg:left-[-1%] xl:w-[130px] xl:h-[130px] xl:bottom-[-6%] xl:left-[-8%]',
		floatAmplitude: 12,
		floatDuration: 4,
		entranceDelay: 1.4,
	},
	{
		src: '/hero-right.svg',
		alt: 'hero-right',
		width: 40,
		height: 40,
		className:
			'absolute right-[-9%] top-[-10%] md:w-[70px] md:h-[60px] md:right-[-6%] md:top-[-18%] lg:w-[90px] lg:h-[90px] lg:top-[-4%] lg:right-0 xl:w-[130px] xl:h-[130px] xl:top-[-8%] xl:right-[-6%]',
		floatAmplitude: 15,
		floatDuration: 4.5,
		entranceDelay: 1.2,
	},
]

// Отдельный компонент для одной иконки (чистая функция, без хуков)
const AnimatedIcon = ({ icon }: { icon: IconConfig }) => (
	// 1️⃣ Внешняя обёртка: появление (fadeInUp)
	<motion.div
		className={icon.className}
		initial={{ opacity: 0, y: 30 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{
			duration: 0.6,
			ease: 'easeOut',
			delay: icon.entranceDelay,
		}}
	>
		{/* 2️⃣ Внутренняя обёртка: бесконечная левитация */}
		<motion.div
			animate={{ y: [0, -icon.floatAmplitude, 0] }}
			transition={{
				duration: icon.floatDuration,
				ease: 'easeInOut',
				repeat: Infinity,
				// Задержка старта левитации = задержка появления + длительность появления (0.6с)
				delay: icon.entranceDelay + 0.6,
			}}
			style={{ willChange: 'transform' }}
		>
			<Image
				src={icon.src}
				alt={icon.alt}
				width={icon.width}
				height={icon.height}
				className='w-full h-full'
				priority={false}
			/>
		</motion.div>
	</motion.div>
)

export const AnimatedHeroIcons = () => {
	return (
		<>
			{ICONS.map((icon, index) => (
				<AnimatedIcon key={index} icon={icon} />
			))}
		</>
	)
}
