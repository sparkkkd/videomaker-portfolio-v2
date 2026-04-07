import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface LanguageGaugeProps {
	language: string
	level: string
	progress: number // 0-100, процент заполнения
	className?: string
}

export const LanguageGauge = ({
	className,
	language,
	level,
	progress,
}: LanguageGaugeProps) => {
	const radius = 50
	const circumference = Math.PI * radius // Длина половины окружности
	const strokeDashoffset = circumference - (progress / 100) * circumference

	return (
		<div className={`flex flex-col items-center ${className}`}>
			{/* Название языка */}
			<span className='mt-10 text-2xl font-medium mb-[10px]'>{language}</span>

			{/* SVG полукруг */}
			<div className='relative w-[160px] h-[80px]'>
				<svg viewBox='0 0 120 60' className='w-full h-full'>
					{/* Фоновый полукруг (белый) */}
					<path
						d='M 10 60 A 50 50 0 0 1 110 60'
						fill='none'
						stroke='#FFFFFF'
						strokeWidth='12'
						strokeLinecap='round'
					/>

					{/* Прогресс полукруга (чёрный) */}
					<path
						d='M 10 60 A 50 50 0 0 1 110 60'
						fill='none'
						stroke='#000000'
						strokeWidth='12'
						strokeLinecap='round'
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						className='transition-all duration-1000 ease-out'
					/>
				</svg>

				{/* Уровень по центру */}
				<div className='absolute bottom-[-20px] left-1/2 -translate-x-1/2'>
					<span className='text-[48px] font-bold'>{level}</span>
				</div>
			</div>
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
				'p-[35px] relative overflow-hidden flex flex-col bg-[#e0fd35] rounded-[30px]',
			)}
		>
			<div className='font-semibold text-[44px] leading-[90%]'>Языки</div>

			<div className='flex justify-between'>
				<LanguageGauge language='english' level='C1' progress={85} />
				<LanguageGauge language='español' level='A1' progress={15} />
			</div>

			<Image
				src='/education-card-bg.png'
				alt=''
				width={300}
				height={230}
				className='absolute right-0 bottom-0'
			/>
		</div>
	)
}
