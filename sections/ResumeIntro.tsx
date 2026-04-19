import { Container } from '@/components/Container'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

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
			)}
		>
			<Container>
				<div className='flex items-center justify-center gap-[5px]'>
					<Image
						src='/avatar.png'
						alt='Дмитрий'
						width={24}
						height={24}
						className='rounded-full'
					/>
					<p className='text-[clamp(10px,calc(1.09vw_+_6.5px),24px)] text-black/60 font-semibold'>
						Привет! Меня зовут Дмитрий Кузьмин и я
					</p>
				</div>

				<div
					className={twMerge(
						'mx-auto mt-[15px] relative flex items-center justify-center',
						'lg:mt-[30px]',
					)}
				>
					<h1
						className='font-druk text-[56px] leading-[96%] text-secondary uppercase text-center relative'
						style={{ fontSize: 'clamp(56px, calc(9.6vw + 25px), 179px)' }}
					>
						<div>Видеомонтажер,</div>
						<div>моушен- И ГРАФ-</div>
						<div>ДИЗАЙНЕР</div>
						<Tag
							className='absolute left-[5%] top-[-2%]'
							label='Проектное сотрудничество'
						/>
						<Tag
							className='absolute right-[14%] top-[30%]'
							label='Удаленная работа'
						/>
						<Tag
							className='absolute left-[26%] bottom-[26%] rotate-[-2deg]'
							label='г. Рязань'
						/>
					</h1>
				</div>

				<div
					className={twMerge(
						'px-[18px] mt-8',
						'md:flex md:gap-[30px] md:mt-[55px]',
					)}
				>
					<Button className='!text-primary' variant='black'>
						Связаться со мной
					</Button>
					<Button className={twMerge('mt-[15px]', 'md:mt-0')} outline>
						Скачать PDF-резюме
					</Button>
				</div>
			</Container>
		</section>
	)
}
