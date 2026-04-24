import { IEducation } from '@/constants/education.constant'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface EducationCardProps {
	className?: string
	education: IEducation
}

export const EducationCard = ({ className, education }: EducationCardProps) => {
	return (
		<div
			className={twMerge(
				className,
				'flex flex-col gap-[10px]',
				'md:min-w-[252px] md:flex-row md:items-center md:gap-4',
				'lg:gap-[30px] lg:min-w-[432px]',
				'xl:min-w-fit xl:max-w-fit xl:flex-col xl:items-start xl:gap-[15px]',
			)}
		>
			<Image
				src={education.icon}
				alt={education.label}
				width={62}
				height={62}
				className={twMerge(
					'w-[25px] h-[25px]',
					'md:w-[35px] md:h-[35px]',
					'lg:w-[62px] lg:h-[62px]',
				)}
			/>
			<div>
				<h5
					className={twMerge(
						'text-[14px] font-semibold leading-[125%]',
						'md:text-[19px]',
						'lg:text-[32px]',
						'xl:mb-[10px]',
					)}
				>
					{education.title}
				</h5>
				<p
					className={twMerge(
						'mt-[5px] text-[12px] font-medium text-black/70',
						'md:text-sm',
						'lg:text-2xl',
					)}
				>
					{education.label}
				</p>
			</div>
		</div>
	)
}
