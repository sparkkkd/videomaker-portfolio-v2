import Image from 'next/image'
import { Container } from './Container'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

interface HeaderProps {
	className?: string
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header
			className={twMerge(
				className,
				'absolute w-full top-[20px]',
				'lg:top-[60px] ',
			)}
		>
			<Container>
				<div
					className={twMerge(
						'flex items-center',
						'py-6 px-[30px] lg:justify-between bg-[#141414] rounded-[17px]',
					)}
				>
					<Link
						href='/resume'
						className={twMerge(
							'ml-auto mr-[10px] py-[5px] px-3 flex items-center bg-white rounded-[5px] order-2',
							'lg:m-0 lg:py-3 lg:px-[25px] lg:-order-1 lg:rounded-[10px] lg:gap-2.5',
						)}
					>
						<Image
							src='/avatar.png'
							alt='Dmitriy'
							width={36}
							height={36}
							className='rounded-full lg:block hidden'
							priority
						/>
						<span className={twMerge('text-black text-[12px]', 'lg:text-2xl')}>
							Мое резюме
						</span>
					</Link>

					<Link href='/' className=''>
						<Image
							src='/logo.svg'
							alt='logo'
							width={84}
							height={57}
							className={twMerge(
								'w-[46px] h-[30px]',
								'lg:w-[84px] lg:h-[57px]',
							)}
						/>
					</Link>

					<div
						className={twMerge(
							'py-[6px] pl-1 pr-[6px] flex items-center bg-white rounded-full order-2',
							'lg:py-5 lg:px-[25px] lg:gap-[15px] lg:order-3 lg:rounded-[10px]',
						)}
					>
						<Image
							src='/arrow-top-right.svg'
							alt='contact'
							width={21}
							height={21}
							className='hidden lg:block'
						/>
						<span className='hidden lg:block'>Связь со мной</span>

						<Image
							src='/tg.svg'
							alt='tg'
							width={14}
							height={12}
							className='lg:hidden'
						/>
					</div>
				</div>
			</Container>
		</header>
	)
}
