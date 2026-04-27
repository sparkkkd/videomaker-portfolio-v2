import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface LanguageGaugeProps {
	language: string
	level: string
	className?: string
	src: string
	alt: string
}

export const LanguageGauge = ({
	className,
	language,
	level,
	src,
	alt,
}: LanguageGaugeProps) => {
	return (
		<div className={`flex flex-col items-center ${className}`}>
			<span
				className={twMerge(
					'text-sm font-semibold',
					'md:text-2xl',
					'lg:text-[40px]',
					'xl:text-2xl',
				)}
			>
				{language}
			</span>
			<div className='mt-3 relative xl:mt-0'>
				<Image
					src={src}
					alt={alt}
					width={100}
					height={50}
					className={twMerge(
						'md:w-[235px] md:h-[98px]',
						'lg:w-[275px] lg:h-[138px]',
						'xl:w-[161px] xl:h-[81px]',
					)}
				/>
				<span
					className={twMerge(
						'absolute bottom-0 left-1/2 -translate-x-1/2 text-[28px] font-bold leading-none',
						'lg:text-[70px]',
						'xl:text-[44px]',
					)}
				>
					{level}
				</span>
			</div>
			<div></div>
		</div>
	)
}

interface EducationLanguagesProps {
	className?: string
}

export const EducationLanguages = ({ className }: EducationLanguagesProps) => {
	return (
		<div
			className={twMerge(
				className,
				'pt-4 pb-[180px] relative overflow-hidden flex flex-col justify-center items-center bg-[#CDFA03] rounded-[15px]',
				'md:pt-8',
				'lg:pb-0 lg:h-[600px] lg:justify-start',
				'xl:h-[430px] xl:w-[488px] xl:p-[35px] xl:mt-0 xl:rounded-[30px]',
			)}
		>
			<div
				className={twMerge(
					'text-2xl font-semibold leading-[90%]',
					'md:text-[32px]',
					'lg:text-[44px]',
				)}
			>
				Языки
			</div>

			<div
				className={twMerge(
					'mt-3 w-full flex justify-center gap-[22px]',
					'lg:mt-[25px] lg:gap-[123px]',
				)}
			>
				<LanguageGauge
					language='english'
					level='C1'
					src='en-lang-level.svg'
					alt='english'
				/>
				<LanguageGauge
					language='español'
					level='A1'
					src='es-lang-level.svg'
					alt='espanol'
				/>
			</div>

			<Image
				src='/education-card-bg.svg'
				alt=''
				width={635}
				height={396}
				className={twMerge(
					'w-full absolute right-0 bottom-[-50px]',
					'md:w-[385px] md:h-[246px] md:bottom-[-80px] md:left-1/2 md:-translate-x-1/2',
					'lg:w-[635px] lg:h-[396px] lg:bottom-[-142px]',
					'xl:w-[327px] xl:h-[229px] xl:bottom-[-60px] xl:right-[-10px] xl:left-auto xl:-translate-x-0',
				)}
			/>
		</div>
	)
}
