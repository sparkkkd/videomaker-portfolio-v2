import { IEducation } from '@/constants/education.constant'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface EducationCardProps {
	className?: string
	education: IEducation
}

export const EducationCard = ({ className, education }: EducationCardProps) => {
	return (
		<div className={twMerge(className, 'flex flex-col')}>
			<Image
				src={education.icon}
				alt={education.title}
				width={62}
				height={62}
				className='mb-[15px]'
			/>
			<h5 className='mb-[10px] font-semibold text-[32px] leading-[125%]'>
				{education.title}
			</h5>
			<p className='font-medium text-black/70 text-2xl'>{education.label}</p>
		</div>
	)
}
