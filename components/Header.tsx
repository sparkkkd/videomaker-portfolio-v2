import { twMerge } from 'tailwind-merge'

import Image from 'next/image'

import { Container } from './Container'
import { Navigation } from './Navigation'
import { HeaderBackground } from './HeaderBackground'
import Link from 'next/link'

interface HeaderProps {
	className?: string
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header
			className={twMerge(
				className,
				'absolute w-full top-[25px]',
				'lg:top-[50px]',
			)}
		>
			<Container className='relative'>
				<HeaderBackground />

				<div
					className={twMerge(
						'py-[10px] px-[20px] flex flex-row justify-between items-center z-20 relative',
						'md:py-[15px] md:px-[20px]',
						'lg:py-[25px] lg:px-[40px]',
					)}
				>
					<Link href='/'>
						<Image
							src='/logo.svg'
							alt='Dmitry Kuzmin'
							width={55}
							height={37}
							className='lg:w-[84px] lg:h-[57px]'
						/>
					</Link>
					<Navigation />
				</div>
			</Container>
		</header>
	)
}
