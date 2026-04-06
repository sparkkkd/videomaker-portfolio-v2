import { Container } from '@/components/Container'
import { AnimatedResumeIntro } from '@/features/AnimatedResumeIntro'
import { twMerge } from 'tailwind-merge'

interface ResumeIntroProps {
	className?: string
}

export const ResumeIntro = ({ className }: ResumeIntroProps) => {
	return (
		<section
			className={twMerge(
				className,
				'pt-[240px] pb-[145px] text-[86px] font-semibold bg-[#D6FA03]',
			)}
		>
			<h2 className='hidden'>
				Привет, меня зовут Дмитрий. Я монтажер, моушен дизайнер и дизайнер.
			</h2>

			<Container>
				<AnimatedResumeIntro />
			</Container>
		</section>
	)
}
