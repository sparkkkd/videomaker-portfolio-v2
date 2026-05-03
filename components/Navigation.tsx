'use client'

import { startTransition, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { usePathname } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'

import Link from 'next/link'
import Image from 'next/image'

import { NAVIGATIONS, type NavigationT } from '@/constants/navigation.constant'
import { slideInOut } from '@/constants/animation.constant'

import { Burger } from './ui/Burger'
import { MobileMenu } from './MobileMenu'

interface NavigationProps {
	className?: string
}

export const Navigation = ({ className }: NavigationProps) => {
	const router = useTransitionRouter()
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	useEffect(() => {
		startTransition(() => {
			setIsMenuOpen(false)
		})
	}, [pathname])

	return (
		<div
			className={twMerge(
				'w-full flex items-center justify-between',
				'md:justify-start',
				'lg-custom:justify-between',
			)}
		>
			<Link
				href='/'
				onClick={(e) => {
					if (pathname === '/') return

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
			<Burger className='md:hidden' onClick={() => setIsMenuOpen(true)} />

			<nav
				className={twMerge(
					className,
					'hidden',
					'md:flex md:ml-auto',
					'lg-custom:absolute lg-custom:left-1/2 lg-custom:top-1/2 lg-custom:-translate-1/2',
				)}
			>
				<ul className='text-white flex items-center lg:gap-[50px] md:gap-[30px]'>
					{NAVIGATIONS.map((item) => (
						<NavigationItem
							className='hidden md:flex'
							key={item.href}
							item={item}
						/>
					))}
				</ul>
			</nav>

			<Link
				href='#'
				className={twMerge(
					'hidden',
					'md:ml-[30px] md:flex md:items-center md:gap-[10px]',
					'lg:ml-[50px]',
				)}
			>
				<span className='font-bold text-white text-base lg:text-2xl'>
					Связаться со мной
				</span>
				<Image
					src='/arrow-top-right.svg'
					alt='contact me'
					width={21}
					height={21}
				/>
			</Link>

			<MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</div>
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
	const pathname = usePathname()

	const isActive = pathname === item.href

	return (
		<li className={twMerge(className)}>
			<Link
				href={item.href}
				className={twMerge(
					'lg:text-2xl',
					isActive && 'text-[#CDFA03] font-bold',
				)}
				onClick={(e) => {
					if (pathname === item.href) return

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
