import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { AnimatedHeroTitle } from '@/components/Hero/AnimatedHeroTitle'
import { AnimatedHeroIcons } from '@/components/Hero/AnimatedHeroIcons'
import { AnimatedHeroContent } from '@/components/Hero/AnimatedHeroContent'

interface HeroSectionProps {
	className?: string
}

export const HeroSection = ({ className }: HeroSectionProps) => {
	return (
		<section
			className={twMerge(
				className,
				'pt-[110px] pb-[90px] bg-[#1C1C1C] rounded-b-[25px]',
				'md:pt-[120px] md:rounded-b-[70px]',
				'lg:pt-[200px]',
			)}
		>
			<Container>
				<div
					className={twMerge(
						'mx-auto relative max-w-[260px]',
						'md:max-w-[500px]',
						'lg:max-w-full',
					)}
				>
					<h1 className='sr-only'>Оживляю идеи через видео, анимацию и ии</h1>
					<AnimatedHeroTitle
						text='Оживляю идеи через видео, анимацию и ии'
						className='relative'
					/>
					<AnimatedHeroIcons />
				</div>

				<AnimatedHeroContent />
			</Container>
		</section>
	)
}
