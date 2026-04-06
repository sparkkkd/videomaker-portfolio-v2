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
		<section className={twMerge(className, 'mt-[240px] relative')}>
			<AnimatedHeroIcons />

			<Container className='overflow-visible'>
				<div>
					<div className='py-[86px] px-[68px] relative bg-black text-white rounded-[30px] overflow-hidden'>
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
