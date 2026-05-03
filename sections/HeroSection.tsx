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
				'pt-[110px] pb-[70px] bg-[#1C1C1C] rounded-b-[25px] relative z-10',
				'md:pt-[120px] md:pb-[140px] md:rounded-b-[70px]',
				'lg:pt-[200px] lg:pb-[150px]',
				'bg-[url(/star.svg)] bg-center bg-no-repeat bg-[length:clamp(1236px,687.69px+152.3vw,2820px)]',
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
					<h1 className='sr-only' tabIndex={-1}>
						Оживляю идеи через видео, анимацию и ии
					</h1>
					<div className='relative max-w-fit w-fit mx-auto'>
						<AnimatedHeroTitle text='Оживляю идеи через видео, анимацию и ии' />
						<AnimatedHeroIcons />
					</div>
				</div>

				<AnimatedHeroContent />
			</Container>
		</section>
	)
}
