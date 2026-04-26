import { twMerge } from 'tailwind-merge'

import { Container } from './Container'
import { Navigation } from './Navigation'
import { HeaderBackground } from './HeaderBackground'

interface HeaderProps {
	className?: string
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<header
			className={twMerge(
				className,
				'px-[20px] w-full absolute top-[25px]',
				'lg:top-[50px]',
				'xl:px-0',
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
					<Navigation />
				</div>
			</Container>
		</header>
	)
}
