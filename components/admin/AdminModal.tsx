'use client'

import { startTransition, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from 'framer-motion'

interface AdminModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
	sm: 'max-w-md',
	md: 'max-w-lg',
	lg: 'max-w-2xl',
	xl: 'max-w-4xl',
}

export function AdminModal({
	isOpen,
	onClose,
	title,
	children,
	className,
	size = 'md',
}: AdminModalProps) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		startTransition(() => setIsMounted(true))
	}, [])

	useEffect(() => {
		if (!isOpen) return

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleEsc)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleEsc)
			document.body.style.overflow = 'unset'
		}
	}, [isOpen, onClose])

	if (!isMounted) return null

	return createPortal(
		<AnimatePresence mode='wait'>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 z-50 bg-black/60 backdrop-blur-xs'
					/>

					<div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
							onClick={(e) => e.stopPropagation()}
							className={twMerge(
								'pointer-events-auto w-full rounded-2xl bg-[#1f1f1f] border border-[#272727] shadow-2xl',
								'flex flex-col max-h-[90vh]',
								sizes[size],
								className,
							)}
						>
							<div className='flex items-center justify-between px-6 py-4 border-b border-[#272727]'>
								<h2 className='text-lg font-semibold text-white'>{title}</h2>
								<button
									onClick={onClose}
									className='p-2 text-gray-400 hover:text-white hover:bg-[#272727] rounded-lg transition-colors'
									aria-label='Закрыть'
								>
									✕
								</button>
							</div>

							<div className='flex-1 overflow-y-auto px-6 py-4 modal-scrollbar'>
								{children}
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>,
		document.body,
	)
}
