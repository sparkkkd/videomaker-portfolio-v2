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
				'mt-[-5px] pb-[70px] bg-[#DBFB1B] w-full relative overflow-hidden',
				'lg:mt-[-76px] lg:pt-[76px] lg:pb-[200px]',
			)}
		>
			<Container className='relative z-10'>
				<div
					className={twMerge(
						'mt-[50px] py-[30px] px-5 w-full flex flex-col items-center bg-[#282828] rounded-[10px]',
						'lg:mt-[124px] lg:px-[40px] lg:pt-[80px] lg:pb-[108px] lg:rounded-[30px]',
					)}
				>
					<h3
						className={twMerge(
							'text-white font-semibold text-[28px] text-center leading-[95%]',
							'lg:max-w-[850px] lg:text-[64px] lg:leading-[90%]',
						)}
					>
						Давайте создадим ваш следующий проект вместе
					</h3>

					<p
						className={twMerge(
							'mt-[10px] text-[14px] text-center text-white opacity-70 leading-none',
							'lg:mt-5 lg:max-w-[850px] lg:text-[32px] lg:leading-[120%]',
						)}
					>
						Я открыт к сотрудничеству и предложениям о работе. Напишите мне,
						чтобы обсудить ваши задачи, идеи или возможность присоединиться к
						вашей команде
					</p>

					<ContactCards />
				</div>

				<ContactButton className='mt-5' />
			</Container>

			<Image
				src='/footer-bg.svg'
				width={1955}
				height={720}
				alt=''
				className={twMerge(
					'absolute bottom-[84px] left-0 pointer-events-none select-none',
				)}
			/>
		</footer>
	)
}
