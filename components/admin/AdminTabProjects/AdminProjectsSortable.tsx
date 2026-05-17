'use client'

import { useState, useEffect, useMemo, startTransition } from 'react'
import { motion, Variants } from 'framer-motion'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	arrayMove,
	sortableKeyboardCoordinates,
	SortableContext,
	verticalListSortingStrategy,
	rectSortingStrategy,
} from '@dnd-kit/sortable'
import toast from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

import { Project } from '@/lib/api/types/project.types'
import { useReorderProjects } from '@/lib/api/hooks/projects.hooks'
import { SortableProjectCard } from './SortableProjectCard'
import { SortableProjectRow } from './SortableProjectRow'

interface AdminProjectsSortableProps {
	projects: Project[]
	onEdit: (project: Project) => void
	viewMode: 'grid' | 'list'
	tabId?: string
}

const ViewVariants: Variants = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const AdminProjectsSortable = ({
	projects,
	onEdit,
	viewMode,
	tabId,
}: AdminProjectsSortableProps) => {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const reorderMutation = useReorderProjects()
	const [sortedIds, setSortedIds] = useState(() => projects.map((p) => p.id))

	useEffect(() => {
		startTransition(() => setSortedIds(projects.map((p) => p.id)))
	}, [projects])

	const projectMap = useMemo(
		() => new Map(projects.map((p) => [p.id, p])),
		[projects],
	)
	const strategy =
		viewMode === 'grid' ? rectSortingStrategy : verticalListSortingStrategy

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		setSortedIds((prev) => {
			const oldIndex = prev.indexOf(active.id as string)
			const newIndex = prev.indexOf(over.id as string)
			const newOrder = arrayMove(prev, oldIndex, newIndex)

			reorderMutation.mutate(
				{ projectIds: newOrder, tabId },
				{
					onError: () => {
						toast.error('Ошибка при обновлении порядка')
						setSortedIds(prev)
					},
				},
			)
			return newOrder
		})
	}

	return (
		<AnimatePresence mode='wait'>
			{viewMode === 'grid' && (
				<motion.div
					key='grid-view'
					variants={ViewVariants}
					initial='initial'
					animate='animate'
					exit='exit'
				>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext items={sortedIds} strategy={strategy}>
							<div className='grid grid-cols-3 gap-6'>
								{sortedIds.map((id, index) => {
									const project = projectMap.get(id)
									return project ? (
										<SortableProjectCard
											key={id}
											project={project}
											index={index}
											onEdit={onEdit}
										/>
									) : null
								})}
							</div>
						</SortableContext>
					</DndContext>
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
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext items={sortedIds} strategy={strategy}>
							<div className='bg-[#1f1f1f] rounded-xl text-white shadow-md border border-[#1f1f1f] overflow-hidden'>
								<table className='w-full'>
									<thead className='bg-[#1f1f1f] border-b border-[#272727] shadow-sm'>
										<tr>
											<th className='w-10 px-4 py-3'></th>
											<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Превью
											</th>
											<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Название
											</th>
											<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Статус
											</th>
											<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Порядок
											</th>
											<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Категория
											</th>
											<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
												Действия
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-[#272727]'>
										{sortedIds.map((id, index) => {
											const project = projectMap.get(id)
											return project ? (
												<SortableProjectRow
													key={id}
													project={project}
													index={index}
													onEdit={onEdit}
												/>
											) : null
										})}
									</tbody>
								</table>
							</div>
						</SortableContext>
					</DndContext>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
