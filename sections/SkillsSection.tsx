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
			className={twMerge(
				className,
				'pt-10 pb-10',
				'md:pb-[100px]',
				'lg:pb-[130px]',
				'xl:pt-[70px] xl:pb-[150px]',
			)}
		>
			<Container>
				<h3
					className={twMerge(
						'text-center font-semibold text-2xl',
						'md:text-[42px]',
						'lg:text-[64px]',
					)}
				>
					Навыки и компетенции
				</h3>

				<div
					className={twMerge(
						'mt-5 flex flex-col gap-[10px]',
						'xl:mt-[40px] xl:flex-row xl:gap-[21px]',
					)}
				>
					<div className={twMerge('basis-full', 'xl:basis-1/2')}>
						<SkillsAccordion />
					</div>
					<div
						className={twMerge(
							'p-[15px] flex items-center justify-center basis-full rounded-[10px] bg-white relative',
							'xl:py-[30px] xl:px-11 xl:basis-1/2 xl:max-h-[572px]',
						)}
					>
						<Image
							src='/skills.svg'
							alt=''
							width={222}
							height={272}
							className='w-full max-h-[372px] md:max-h-[460px] xl:max-h-full'
						/>
					</div>
				</div>
			</Container>
		</section>
	)
}
