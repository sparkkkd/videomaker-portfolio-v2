'use client'

import { useAdminStore } from '@/lib/store/admin.store'
import { AnimatePresence, Variants } from 'framer-motion'
import { motion } from 'framer-motion'

import { Container } from '../Container'

import { AdminTabsContent } from './AdminTabs/AdminTabsContent'
import { AdminProjectsContent } from './AdminProjects/AdminProjectsContent'
import { AdminTabProjectsContent } from './AdminTabProjects/AdminTabProjectsContent'

interface AdminContentProps {
	className?: string
}

const ContentChangeAnimation: Variants = {
	initial: { opacity: 0, x: 20, filter: 'blur(2px)' },
	animate: {
		opacity: 1,
		x: 0,
		filter: 'blur(0px)',
		transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
	},
	exit: {
		opacity: 0,
		x: -20,
		filter: 'blur(2px)',
		transition: { duration: 0.25, ease: 'easeIn' },
	},
}

export const AdminContent = ({ className }: AdminContentProps) => {
	const { activeSection } = useAdminStore()

	return (
		<div className={className}>
			<Container>
				<AnimatePresence mode='wait'>
					{activeSection === 'tabs' && (
						<motion.div
							variants={ContentChangeAnimation}
							key={'tabs-content'}
							initial='initial'
							animate='animate'
							exit='exit'
						>
							<AdminTabsContent />
						</motion.div>
					)}
					{activeSection === 'projects' && (
						<motion.div
							variants={ContentChangeAnimation}
							key={'projects-content'}
							initial='initial'
							animate='animate'
							exit='exit'
						>
							<AdminProjectsContent />
						</motion.div>
					)}
					{activeSection === 'tabs-projects' && (
						<motion.div
							variants={ContentChangeAnimation}
							key={'tabs-projects'}
							initial='initial'
							animate='animate'
							exit='exit'
						>
							<AdminTabProjectsContent />
						</motion.div>
					)}
				</AnimatePresence>
			</Container>
		</div>
	)
}
