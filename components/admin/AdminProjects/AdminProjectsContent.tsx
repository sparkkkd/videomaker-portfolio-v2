import { useAdminStore } from '@/lib/store/admin.store'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { AdminProjectsListView } from './AdminProjectsListView'
import { AdminProjectsCardView } from './AdminProjectsCardView'

interface AdminProjectsContentProps {
	className?: string
}

const ViewVariants: Variants = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const AdminProjectsContent = ({
	className,
}: AdminProjectsContentProps) => {
	const { projects } = useAdminStore()
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

	return (
		<div className={twMerge(className, 'mt-5 space-y-6')}>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold text-white'>
						Управление проектами
					</h1>
					<p className='text-gray-400 mt-2'>
						Добавляйте и редактируйте работы в портфолио
					</p>

					<div className='mt-4 flex items-center gap-4'>
						<button
							className={twMerge(
								'opacity-60 transition-opacity duration-300',
								viewMode === 'grid' && 'opacity-100',
							)}
							onClick={() => setViewMode('grid')}
						>
							<Image src='/grid-icon.svg' alt='Сетка' width={25} height={25} />
						</button>
						<button
							className={twMerge(
								'opacity-60 transition-opacity duration-300',
								viewMode === 'list' && 'opacity-100',
							)}
							onClick={() => setViewMode('list')}
						>
							<Image src='/list-icon.svg' alt='Список' width={25} height={25} />
						</button>
					</div>
				</div>

				<button
					className={twMerge(
						'px-4 py-2 bg-accent text-white font-semibold rounded-lg',
						'hover:bg-accent/70 transition-colors',
						'flex items-center space-x-2',
					)}
				>
					<span>+</span>
					<span>Создать проект</span>
				</button>
			</div>

			<AnimatePresence mode='wait'>
				{viewMode === 'grid' && (
					<motion.div
						key='grid-view'
						variants={ViewVariants}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<AdminProjectsCardView projects={projects} />
					</motion.div>
				)}

				{viewMode === 'list' && (
					<motion.div
						key='list-view'
						variants={ViewVariants}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<AdminProjectsListView projects={projects} />
					</motion.div>
				)}
			</AnimatePresence>

			{projects.length === 0 && (
				<button className='py-6 w-full text-center bg-[#1f1f1f] rounded-xl border border-[#272727] shadow-md transition-colors duration-300 hover:bg-secondary'>
					<p className='text-gray-400'>Нет проектов. Создайте первый!</p>
				</button>
			)}
		</div>
	)
}
