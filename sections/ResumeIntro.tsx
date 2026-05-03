'use client'

import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/Container'
import { AnimatedIntroText } from '@/components/ResumeIntro/AnimatedIntroText'
import { AnimatedTitle } from '@/components/ResumeIntro/AnimatedIntroTitle'
import { AnimatedIntroTags } from '@/components/ResumeIntro/AnimatedIntroTags'
import { AnimatedIntroButtons } from '@/components/ResumeIntro/AnimatedIntroButtons'
import { AnimatedIntroIcons } from '@/components/ResumeIntro/AnimatedIntroIcons'

interface ResumeIntroProps {
	className?: string
}

export const ResumeIntro = ({ className }: ResumeIntroProps) => {
	return (
		<section
			className={twMerge(
				className,
				'pt-[107px] pb-[50px]',
				'md:pt-[120px]',
				'lg:pt-[200px]',
				'bg-[url(/star-black.svg)] bg-center bg-no-repeat bg-[length:clamp(1236px,687.69px+152.3vw,2820px)]',
			)}
		>
			<h1 className='sr-only' tabIndex={-1}>
				Видеомонтажер, моушен и графический дизайнер-
			</h1>

			<div className='w-full relative overflow-hidden'>
				<Container>
					<AnimatedIntroText delay={0.8} />

					<div
						className={twMerge(
							'mx-auto mt-[15px] relative flex items-center justify-center',
							'lg:mt-[30px]',
						)}
					>
						<div className='relative'>
							<AnimatedTitle
								lines={['Видеомонтажер,', 'моушен- И ГРАФ-', 'ДИЗАЙНЕР']}
								className='text-center'
							/>
							<AnimatedIntroTags />
						</div>
					</div>

					<AnimatedIntroButtons />
				</Container>

				<AnimatedIntroIcons />
			</div>
		</section>
	)
}
