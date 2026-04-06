import Image from 'next/image'
import { Container } from './Container'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
	className?: string
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header className={twMerge(className, 'mt-[60px]')}>
			<Container>
				<div className='py-6 px-[30px] flex items-center justify-between bg-[#141414] rounded-[17px]'>
					<div className='py-3 px-[25px] flex items-center gap-2.5 text-black bg-white rounded-[10px]'>
						<Image
							src='/avatar.png'
							alt='Аватар пользователя'
							width={36}
							height={36}
							className='rounded-full'
							priority
						/>
						<span>Мое резюме</span>
					</div>

					<Image src='/logo.svg' alt='logo' width={84} height={57} />

					<div className='py-5 px-[25px] flex items-center gap-[15px] bg-white rounded-[10px]'>
						<Image
							src='/arrow-top-right.svg'
							alt='contact'
							width={21}
							height={21}
						/>
						<span>Связь со мной</span>
					</div>
				</div>
			</Container>
		</header>
	)
}
