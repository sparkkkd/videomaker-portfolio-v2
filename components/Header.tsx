import { twMerge } from 'tailwind-merge'

import Image from 'next/image'

import { Container } from './Container'
import { Navigation } from './Navigation'

interface HeaderProps {
	className?: string
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header
			className={twMerge(
				className,
				'px-5 absolute w-full top-[25px]',
				'lg:top-[50px]',
			)}
		>
			<Container>
				<div className='flex flex-row justify-between items-center'>
					<Image
						src='/logo.svg'
						alt='Dmitry Kuzmin'
						width={55}
						height={37}
						className='lg:w-[84px] lg:h-[57px]'
					/>
					<Navigation />
				</div>
			</Container>
		</header>
	)
}
