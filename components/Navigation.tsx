'use client'

import { twMerge } from 'tailwind-merge'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATIONS, type NavigationT } from '@/constants/navigation.constant'
import { slideInOut } from '@/constants/animation.constant'

interface NavigationProps {
	className?: string
}

export const Navigation = ({ className }: NavigationProps) => {
	const router = useTransitionRouter()

	return (
		<>
			<Link
				href='/'
				onClick={(e) => {
					try {
						e.preventDefault()
						router.push('/', {
							onTransitionReady: slideInOut,
						})
					} catch (error) {
						console.error('Transition failed', error)
					}
				}}
			>
				<Image
					src='/logo.svg'
					alt='Dmitry Kuzmin'
					width={55}
					height={37}
					className='lg:w-[84px] lg:h-[57px]'
				/>
			</Link>
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
						<Link href='#' className='flex items-center gap-[10px]'>
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
		</>
	)
}

const NavigationItem = ({
	item,
	className,
}: {
	item: NavigationT
	className?: string
}) => {
	const router = useTransitionRouter()

	return (
		<li className={twMerge(className)}>
			<Link
				href={item.href}
				className='lg:text-2xl'
				onClick={(e) => {
					try {
						e.preventDefault()
						router.push(item.href, {
							onTransitionReady: slideInOut,
						})
					} catch (error) {
						console.error('Transition error', error)
					}
				}}
			>
				{item.title}
			</Link>
		</li>
	)
}
