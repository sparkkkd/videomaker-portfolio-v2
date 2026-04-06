import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import { Container } from './Container'
import { ContactButton } from './ContactButton'
import { ContactCards } from './ContactCards'

interface FooterProps {
	className?: string
}

export const Footer = ({ className }: FooterProps) => {
	return (
		<footer
			className={twMerge(
				className,
				'mt-[-76px] pt-[76px] pb-[200px] bg-[#DBFB1B] w-full relative overflow-hidden',
			)}
		>
			<Container className='relative z-10'>
				<div className='mt-[124px] pt-[80px] pb-[108px] w-full flex flex-col items-center bg-[#282828] rounded-[30px]'>
					<h3 className='max-w-[850px] text-white font-semibold text-center text-[64px] leading-[90%]'>
						Давайте создадим ваш следующий проект вместе
					</h3>

					<span className='mt-5 max-w-[850px] text-center text-[32px] text-white opacity-70 leading-[120%]'>
						Я открыт к сотрудничеству и предложениям о работе. Напишите мне,
						чтобы обсудить ваши задачи, идеи или возможность присоединиться к
						вашей команде
					</span>

					<ContactCards />
				</div>

				<ContactButton className='mt-5' />
			</Container>

			<Image
				src='/footer-bg.svg'
				width={1955}
				height={720}
				alt=''
				className='absolute bottom-[84px] left-0 pointer-events-none select-none'
			/>
		</footer>
	)
}
