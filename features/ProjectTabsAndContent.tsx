'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import Image from 'next/image'

import { TABS } from '@/constants/tabs.constant'
import { Tabs } from '@/components/Tabs'

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
	hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
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
	const [activeTabId, setActiveTabId] = useState<string>(TABS[0].id)
	const activeTab = TABS.find((tab) => tab.id === activeTabId)

	return (
		<div className={twMerge(className, '')}>
			<Tabs
				className='mt-5 lg:mt-[45px]'
				tabs={TABS.map(({ id, label }) => ({ id, label }))}
				activeTabId={activeTabId}
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
						'lg:mt-[80px] lg:px-0 lg:grid-cols-2 lg:gap-[60px]',
					)}
				>
					{activeTab?.projects.map(({ id, label, src }) => (
						<motion.div
							key={id}
							variants={itemVariants}
							className='group cursor-pointer'
						>
							<div className='relative overflow-hidden rounded-[30px] bg-[#2A2A2A]'>
								<Image
									src={`/${src}`}
									alt={label}
									width={569}
									height={320}
									className={twMerge(
										'rounded-[15px]',
										'lg:rounded-[30px] lg:transition-transform lg:duration-500 lg:group-hover:scale-105',
									)}
									priority={false}
								/>
							</div>
							<h4
								className={twMerge(
									'mt-[10px] text-[14px] text-white leading-none',
									'lg:mt-5 lg:text-[32px]',
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
