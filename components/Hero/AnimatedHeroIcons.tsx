import { FloatingIcon } from '../FloatingIcon'

interface IconConfig {
	src: string
	alt: string
	width: number
	height: number
	className: string
	entranceDelay: number
	yRange: [number, number]
}

const ICONS: IconConfig[] = [
	{
		src: '/hero-left.svg',
		alt: 'hero-left',
		width: 40,
		height: 40,
		className:
			'absolute left-[-8%] bottom-[-15%] w-[40px] h-[40px] md:w-[70px] md:h-[60px] lg:w-[90px] lg:h-[90px] lg:bottom-[-4%] lg:left-[5%] xl:w-[130px] xl:h-[130px] xl:bottom-[-6%] xl:left-[-8%]',
		yRange: [0, -20],
		entranceDelay: 1.4,
	},
	{
		src: '/hero-right.svg',
		alt: 'hero-right',
		width: 40,
		height: 40,
		className:
			'absolute right-[-9%] top-[-10%] w-[40px] h-[40px] md:w-[70px] md:h-[60px] md:right-[-6%] md:top-[-18%] lg:w-[90px] lg:h-[90px] lg:top-[-4%] lg:right-[5.5%] xl:w-[130px] xl:h-[130px] xl:top-[-8%] xl:right-[-6%]',
		yRange: [-15, 0],
		entranceDelay: 1.2,
	},
]

export const AnimatedHeroIcons = () => {
	return (
		<>
			{ICONS.map((icon, index) => (
				<FloatingIcon
					key={index}
					src={icon.src}
					className={icon.className}
					fill
					alt={icon.alt}
					delay={icon.entranceDelay}
					yRange={icon.yRange}
				/>
			))}
		</>
	)
}
