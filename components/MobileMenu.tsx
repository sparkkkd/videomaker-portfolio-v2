import { AnimatePresence, motion, Variants } from 'framer-motion'
import { createPortal } from 'react-dom'

import Image from 'next/image'
import Link from 'next/link'

import { CONTACTS } from '@/constants/contacts.constant'
import { NAVIGATIONS } from '@/constants/navigation.constant'

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
						/>

						<motion.div
							className='px-5 py-[25px] fixed  h-full w-full bg-[#CDFA03] z-[9999] overflow-scroll md:hidden'
							variants={menuVariants}
							initial='closed'
							animate='open'
							exit='closed'
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
								/>
							</motion.button>

							{/* Menu header */}
							<div className='flex justify-between items-center'>
								<Image
									src='/logo.svg'
									alt='Dmitry Kuzmin'
									width={55}
									height={37}
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
										<span className='text-2xl font-medium'>
											Связаться со мной
										</span>
										<Image
											src='/arrow-top-right-black.svg'
											alt='contact me'
											width={19}
											height={19}
										/>
									</li>
								</ul>
							</motion.nav>

							{/* Menu contacts */}
							<motion.ul
								className='mt-[40px] flex flex-col gap-[15px]'
								variants={itemVariants}
							>
								{CONTACTS.map((item) => (
									<li className='flex flex-col gap-[5px]' key={item.id}>
										<span className='text-[12px] opacity-70'>{item.title}</span>
										<Link
											className='text-[18px] font-semibold'
											href={item.href}
										>
											{item.label}
										</Link>
									</li>
								))}
							</motion.ul>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>,
		document.body,
	)
}
