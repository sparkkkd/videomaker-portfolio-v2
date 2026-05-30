'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { getFullImageUrl } from '@/lib/utils/getFullImageUrl'
import { usePublicTabsWithProjects } from '@/lib/api/hooks/public/usePublicTabsWithProjects'

import Image from 'next/image'

import { Tabs } from '@/components/Tabs'
import { Loader } from '@/components/ui/Loader'
import Link from 'next/link'

interface ProjectTabsAndContentProps {
	className?: string
}

const contentVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		filter: 'blur(2px)',
	},
	visible: {
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		filter: 'blur(2px)',
		transition: { duration: 0.4 },
	},
}

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		filter: 'blur(4px)',
	},
	visible: {
		opacity: 1,
		origin: 2,
		scale: 1,
		filter: 'blur(0px)',
		transition: { duration: 0.4 },
	},
}

export const ProjectTabsAndContent = ({
	className,
}: ProjectTabsAndContentProps) => {
	const { data: tabs = [], isLoading, error } = usePublicTabsWithProjects()

	const [activeTabId, setActiveTabId] = useState<string | null>(null)
	const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0]

	if (isLoading) {
		return (
			<div
				className={twMerge(
					className,
					'relative flex items-center justify-center py-20',
				)}
			>
				<Loader size='lg' />
			</div>
		)
	}

	if (error) {
		return (
			<div className={twMerge(className, 'text-center py-20 text-white')}>
				<p className='text-lg'>Не удалось загрузить проекты</p>
				<button
					onClick={() => window.location.reload()}
					className='mt-4 text-accent hover:underline'
				>
					Попробовать снова
				</button>
			</div>
		)
	}

	if (tabs.length === 0) {
		return (
			<div className={twMerge(className, 'text-center py-20 text-gray-400')}>
				<p>Проекты пока не добавлены</p>
			</div>
		)
	}

	return (
		<div className={twMerge(className, '')}>
			<Tabs
				className='mt-5 lg:mt-[45px]'
				tabs={tabs.map(({ id, label, isActive }) => ({ id, label, isActive }))}
				activeTabId={activeTab?.id || ''}
				onTabChange={setActiveTabId}
			/>

			<AnimatePresence mode='wait'>
				<motion.div
					key={activeTabId}
					variants={contentVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
					className={twMerge(
						'mt-10 px-[10px] grid grid-cols-1 gap-5',
						'md:gap-y-[30px]',
						'lg:mt-[50px] lg:px-0 lg:grid-cols-2 lg:gap-y-[30px]',
						'xl:mt-[60px]',
					)}
				>
					{activeTab?.projects.map(({ id, label, src, href }) => (
						<motion.div
							key={id}
							variants={itemVariants}
							className='group cursor-pointer'
						>
							<Link
								href={href || ''}
								target='_blank'
								rel='noopener noreferrer'
								className='relative overflow-hidden rounded-[15px] bg-[#2A2A2A] lg:rounded-[30px]'
							>
								<Image
									src={getFullImageUrl(src)}
									alt={label}
									width={569}
									height={320}
									className={twMerge(
										'w-full relative object-contain',
										'lg:transition-transform lg:duration-500 lg:group-hover:scale-105',
									)}
									priority={false}
									loading='lazy'
								/>
							</Link>
							<h4
								className={twMerge(
									'mt-[10px] text-[14px] text-white leading-none',
									'md:text-2xl',
									'lg:mt-5 lg:text-[28px]',
									'xl:text-[32px]',
								)}
							>
								{label}
							</h4>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
