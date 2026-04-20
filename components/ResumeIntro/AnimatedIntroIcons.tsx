import { twMerge } from 'tailwind-merge'

import { FloatingIcon } from '../FloatingIcon'

export const AnimatedIntroIcons = ({}) => {
	return (
		<>
			<FloatingIcon
				src='/resume-intro-1.svg'
				alt='resume-intro-1'
				fill
				className={twMerge(
					'hidden absolute bottom-[80px] left-[-37px]',
					'lg:block lg:w-[185px] lg:h-[185px]',
					'xl:w-[318px] xl:h-[318px] xl:bottom-[200px]',
				)}
				delay={0.2}
				duration={4}
				yRange={[0, -20]}
			/>
			<FloatingIcon
				src='/resume-intro-2.svg'
				alt='resume-intro-2'
				fill
				className={twMerge(
					'hidden absolute top-[52px] right-[70px]',
					'lg:block lg:w-[76px] lg:h-[76px]',
					'xl:w-[170px] xl:h-[170px] xl:top-[30px]',
				)}
				delay={0.4}
				duration={3.5}
				yRange={[0, -10]}
			/>
			<FloatingIcon
				src='/resume-intro-3.svg'
				alt='resume-intro-3'
				fill
				className={twMerge(
					'hidden absolute bottom-[155px] right-[-35px]',
					'lg:block lg:w-[140px] lg:h-[140px]',
					'xl:w-[313px] xl:h-[313px] xl:bottom-[100px] xl:right-[-90px]',
				)}
				delay={0.6}
				duration={4.5}
				yRange={[0, -25]}
			/>
		</>
	)
}
