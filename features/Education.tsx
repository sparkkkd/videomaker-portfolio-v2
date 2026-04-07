import { EducationCard } from '@/components/EducationCard'
import { EducationLanguages } from '@/components/EducationLanguages'
import { EDUCATIONS } from '@/constants/education.constant'
import { twMerge } from 'tailwind-merge'

interface EducationProps {
	className?: string
}

export const Education = ({ className }: EducationProps) => {
	return (
		<div className={twMerge(className, 'mt-20')}>
			<h3 className='font-semibold text-center text-[64px] leading-[90%]'>
				Образование
			</h3>

			<div className='mt-10 flex justify-between'>
				<div className='grid grid-cols-2 gap-y-[30px] '>
					{EDUCATIONS.map((item) => (
						<EducationCard
							className='nth-[1]:max-w-[213px] nth-[3]:max-w-[213px] nth-[2]:w-[341px] nth-[4]:w-[341px]'
							key={item.id}
							education={item}
						/>
					))}
				</div>

				<EducationLanguages className='w-[450px]' />
			</div>
		</div>
	)
}
