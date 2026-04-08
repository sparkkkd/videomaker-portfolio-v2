import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { HeroAnimatedContent } from '@/components/HeroAnimatedContent'
import { AnimatedHeroIcons } from '@/ui/AnimatedHeroIcons'
import { AnimatedGradientRects } from '@/ui/AnimatedGradientRects'

interface HeroSectionProps {
	className?: string
}

export const HeroSection = ({ className }: HeroSectionProps) => {
	return (
		<section
			className={twMerge(className, 'relative mt-[130px]', 'lg:mt-[240px]')}
		>
			<Container className='overflow-visible relative'>
				<AnimatedHeroIcons />

				<div>
					<div
						className={twMerge(
							'pt-[20px] pb-[50px] px-[20px] relative bg-black text-white rounded-[10px] overflow-hidden',
							'lg:py-[86px] lg:px-[68px] lg:rounded-[30px]',
						)}
					>
						{/* Title for SEO */}
						<h1 className='text-[88px] text-center font-medium leading-[95%] hidden'>
							Оживляю смыслы через кадр, анимацию и визуальный ИИ
						</h1>

						<HeroAnimatedContent />
						<AnimatedGradientRects />
					</div>
				</div>
			</Container>
		</section>
	)
}
