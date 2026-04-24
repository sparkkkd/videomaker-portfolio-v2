import { EducationCard } from '@/components/EducationCard'
import { EducationLanguages } from '@/components/EducationLanguages'
import { EDUCATIONS } from '@/constants/education.constant'
import { twMerge } from 'tailwind-merge'

interface EducationProps {
	className?: string
}

export const Education = ({ className }: EducationProps) => {
	return (
		<div
			className={twMerge(
				className,
				'mt-10 lg:mt-20',
				'md:px-[70px]',
				'lg:px-0',
			)}
		>
			<h3
				className={twMerge(
					'text-2xl font-semibold text-center leading-[90%]',
					'md:text-[42px]',
					'md:text-[64px]',
				)}
			>
				Образование
			</h3>

			<div
				className={twMerge(
					'mt-[25px] flex flex-col w-fit mx-auto',
					'md:mx-0 md:mt-10 md:w-full',
					'lg:mt-[50px]',
					'xl:flex-row xl:gap-[80px]',
				)}
			>
				<div
					className={twMerge(
						'grid grid-cols-2 gap-y-[20px] gap-x-[33px]',
						'lg:gap-y-[30px]',
						'lg:gap-x-0',
					)}
				>
					{EDUCATIONS.map((item, index) => (
						<EducationCard
							className={twMerge(
								index % 2 === 0
									? 'md:justify-self-start'
									: 'md:justify-self-end',
								'xl:justify-self-start',
							)}
							key={item.id}
							education={item}
						/>
					))}
				</div>

				<EducationLanguages
					className={twMerge('mt-5 w-full', 'md:mt-10', 'xl:w-fit')}
				/>
			</div>
		</div>
	)
}
