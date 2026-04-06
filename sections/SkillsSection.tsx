import { Container } from '@/components/Container'
import { SkillsAccordion } from '@/components/SkillsAccordion'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface SkillsSectionProps {
	className?: string
}

export const SkillsSection = ({ className }: SkillsSectionProps) => {
	return (
		<section
			className={twMerge(className, 'pt-[70px] pb-[200px] bg-[#D6FA03]')}
		>
			<Container>
				<h3 className='text-[64px] text-center font-semibold text-black'>
					Навыки и компетенции
				</h3>

				<div className='mt-[40px] flex gap-[21px]'>
					<div className='basis-1/2'>
						<SkillsAccordion />
					</div>
					<div className='basis-1/2'>
						<Image src='/skills.svg' alt='' width={590} height={572} />
					</div>
				</div>
			</Container>
		</section>
	)
}
