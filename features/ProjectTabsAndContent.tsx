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

const itemVariants = {
	hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
	visible: {
		opacity: 1,
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
				className='mt-[45px]'
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
					className='mt-[80px] grid grid-cols-2 gap-[60px]'
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
									className='rounded-[30px] transition-transform duration-500 group-hover:scale-105'
									priority={false}
								/>
							</div>
							<h4 className='mt-[30px] text-white text-[32px]'>{label}</h4>
						</motion.div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
