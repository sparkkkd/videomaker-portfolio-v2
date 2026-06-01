import { AnimatePresence, motion, Variants } from 'framer-motion'
import { createPortal } from 'react-dom'

import Image from 'next/image'
import Link from 'next/link'

import { CONTACTS } from '@/constants/contacts.constant'
import { NAVIGATIONS } from '@/constants/navigation.constant'
import { startTransition, useEffect, useState } from 'react'

interface MobileMenuProps {
	isOpen: boolean
	onClose: () => void
}

const menuVariants: Variants = {
	closed: {
		left: '100%',
		transition: {
			duration: 1,
			ease: [0.87, 0, 0.13, 1],
			delay: 0.1,
		},
	},
	open: {
		left: 0,
		transition: {
			duration: 1,
			ease: [0.87, 0, 0.13, 1],
			staggerChildren: 0.1,
			delayChildren: 0.7,
		},
	},
}

const buttonVariants: Variants = {
	closed: {
		right: '-100%',
		opacity: 0,
		transition: {
			duration: 1,
			ease: [0.87, 0, 0.13, 1],
		},
	},
	open: {
		right: '10%',
		opacity: 1,
		transition: {
			duration: 1,
			ease: [0.87, 0, 0.13, 1],
		},
	},
}

const itemVariants: Variants = {
	closed: {
		y: 25,
		opacity: 0,
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
	open: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
	const [mounted, setMounted] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (typeof document !== 'undefined' && document.body) {
			startTransition(() => setMounted(true))
		}
	}, [])

	useEffect(() => {
		const handleError = (e: ErrorEvent) => {
			console.error('🔥 Caught error:', e.message, e.error)
			setError(e.message || 'Unknown error')
		}

		const handleRejection = (e: PromiseRejectionEvent) => {
			console.error('🔥 Unhandled promise:', e.reason)
			setError(String(e.reason))
		}

		window.addEventListener('error', handleError)
		window.addEventListener('unhandledrejection', handleRejection)

		return () => {
			window.removeEventListener('error', handleError)
			window.removeEventListener('unhandledrejection', handleRejection)
		}
	}, [])

	if (!mounted || typeof document === 'undefined' || !document.body) {
		return null
	}

	if (error) {
		return (
			<div className='fixed inset-0 z-[10000] bg-red-900 text-white p-4 overflow-auto'>
				<h2 className='text-xl font-bold mb-4'>Ошибка на клиенте</h2>
				<pre className='text-xs bg-black/30 p-2 rounded whitespace-pre-wrap'>
					{error}
				</pre>
				<button
					onClick={() => {
						setError(null)
						onClose()
					}}
					className='mt-4 px-4 py-2 bg-white text-red-900 rounded font-bold'
				>
					Закрыть и попробовать снова
				</button>
			</div>
		)
	}

	return createPortal(
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							className='fixed inset-0 bg-black/80 z-[9998] md:hidden'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.7 }}
							onClick={onClose}
							suppressHydrationWarning
						/>

						<motion.div
							className='px-5 py-[25px] fixed  h-full w-full bg-[#CDFA03] z-[9999] overflow-scroll md:hidden'
							variants={menuVariants}
							initial='closed'
							animate='open'
							exit='closed'
							suppressHydrationWarning
						>
							<motion.button
								type='button'
								onClick={onClose}
								className='fixed right-[25px] top-[48px] z-[10000] cursor-pointer'
								aria-label='Закрыть меню'
								variants={buttonVariants}
								initial='closed'
								animate='open'
								exit='closed'
							>
								<Image
									src='/close.svg'
									alt='close'
									width={17}
									height={17}
									className='pointer-events-none'
									unoptimized
								/>
							</motion.button>

							{/* Menu header */}
							<div className='flex justify-between items-center'>
								<Image
									src='/logo.svg'
									alt='Dmitri Kuzmin'
									width={55}
									height={37}
									unoptimized
								/>
							</div>

							{/* Menu links */}
							<motion.nav className='mt-[50px]' variants={itemVariants}>
								<ul className='flex flex-col gap-[15px]'>
									{NAVIGATIONS.map((item, index) => (
										<li className='text-2xl font-medium' key={index}>
											<Link href={item.href}>{item.title}</Link>
										</li>
									))}
									<li className='flex items-center gap-[10px]'>
										<Link
											className='text-2xl font-medium'
											href='https://t.me/dm1017y'
											target='_blank'
											rel='noopener noreferrer'
										>
											Связаться со мной
										</Link>
										<Image
											src='/arrow-top-right-black.svg'
											alt='contact me'
											width={19}
											height={19}
											unoptimized
										/>
									</li>
								</ul>
							</motion.nav>

							{/* Menu contacts */}
							<motion.ul
								className='mt-[40px] flex flex-col gap-[15px]'
								variants={itemVariants}
							>
								{CONTACTS.map((item) => {
									const externalProps = external
										? { target: '_blank', rel: 'noopener noreferrer' }
										: {}
									return (
										<li className='flex flex-col gap-[5px]' key={item.id}>
											<span className='text-[12px] opacity-70'>
												{item.title}
											</span>
											<Link
												className='text-[18px] font-semibold'
												href={item.href}
												{...externalProps}
											>
												{item.label}
											</Link>
										</li>
									)
								})}
							</motion.ul>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>,
		document.body,
	)
}
