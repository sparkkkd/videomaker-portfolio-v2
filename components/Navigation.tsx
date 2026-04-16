import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATIONS, type NavigationT } from '@/constants/navigation.constant'

interface NavigationProps {
	className?: string
}

export const Navigation = ({ className }: NavigationProps) => {
	return (
		<nav className={twMerge(className)}>
			<ul className='text-white flex items-center lg:gap-[50px] md:gap-[30px]'>
				{NAVIGATIONS.map((item) => (
					<NavigationItem
						className='hidden md:flex'
						key={item.href}
						item={item}
					/>
				))}
				<li>
					<Link href='/' className='flex items-center gap-[10px]'>
						<span className='text-xs lg:text-2xl'>Связь со мной</span>
						<Image
							src='/arrow-top-right.svg'
							alt='contact me'
							width={21}
							height={21}
						/>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

const NavigationItem = ({
	item,
	className,
}: {
	item: NavigationT
	className?: string
}) => {
	return (
		<li className={twMerge(className)}>
			<Link href={item.href} className='lg:text-2xl'>
				{item.title}
			</Link>
		</li>
	)
}
