'use client'

import { useState, useEffect, useMemo, startTransition } from 'react'
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
	useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

import type { Tab } from '@/lib/api/types/tabs.types'
import { useDeleteTab, useReorderTabs } from '@/lib/api/hooks/tabs.hooks'
import { getErrorMessage } from '@/lib/utils/errorHandlers'

import { ConfirmDeleteModal } from '../ConfirmDeleteModal'

interface AdminTabsSortableProps {
	tabs: Tab[]
	onEdit: (tab: Tab) => void
}

function SortableTabRow({
	tab,
	index,
	onEdit,
	onDelete,
	isDeleting,
}: {
	tab: Tab
	index: number
	onEdit: (tab: Tab) => void
	onDelete: () => void
	isDeleting?: boolean
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: tab.id })

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 50 : 'auto',
		opacity: isDragging ? 0.4 : 1,
	}

	return (
		<tr
			ref={setNodeRef}
			style={style}
			className={twMerge(
				'hover:bg-secondary transition-colors duration-200',
				isDragging && 'bg-[#272727]',
			)}
		>
			<td
				className='w-10 px-4 py-4 cursor-grab active:cursor-grabbing'
				{...attributes}
				{...listeners}
			>
				<div className='flex justify-center text-gray-500 hover:text-white transition-colors'>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 8h16M4 16h16'
						/>
					</svg>
				</div>
			</td>

			<td className='px-6 py-4'>
				<span className='font-medium text-white'>{tab.label}</span>
			</td>
			<td className='px-6 py-4'>
				<code className='text-sm text-gray-400 bg-[#272727] px-2 py-1 rounded'>
					{tab.slug}
				</code>
			</td>
			<td className='px-6 py-4'>
				<span className='text-white font-mono'>{index + 1}</span>
			</td>
			<td className='px-6 py-4'>
				<span
					className={twMerge(
						'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
						tab.isActive
							? 'bg-[#272727] text-teal-500 font-semibold'
							: 'bg-[#272727] text-gray-400',
					)}
				>
					{tab.isActive ? 'Активен' : 'Скрыт'}
				</span>
			</td>
			<td className='px-6 py-4 text-right space-x-5'>
				<button
					onClick={() => onEdit(tab)}
					className='text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors duration-200'
				>
					Редактировать
				</button>
				<button
					className='text-rose-800 hover:text-rose-600 text-sm font-medium transition-colors duration-200'
					onClick={onDelete}
					disabled={isDeleting}
				>
					Удалить
				</button>
			</td>
		</tr>
	)
}

export function AdminTabsSortable({ tabs, onEdit }: AdminTabsSortableProps) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const reorderMutation = useReorderTabs()

	const [sortedIds, setSortedIds] = useState(() => tabs.map((t) => t.id))

	const { mutateAsync: deleteTab, isPending: isDeletingTab } = useDeleteTab()
	const [deletingTabId, setDeletingTabId] = useState<string | null>(null)

	useEffect(() => {
		startTransition(() => setSortedIds(tabs.map((t) => t.id)))
	}, [tabs])

	const tabMap = useMemo(() => new Map(tabs.map((t) => [t.id, t])), [tabs])

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!over || active.id === over.id) return

		setSortedIds((prev) => {
			const oldIndex = prev.indexOf(active.id as string)
			const newIndex = prev.indexOf(over.id as string)
			const newOrder = arrayMove(prev, oldIndex, newIndex)

			reorderMutation.mutate(newOrder, {
				onError: () => {
					toast.error('Ошибка при обновлении порядка')
					setSortedIds(prev)
				},
			})

			return newOrder
		})
	}

	const handleDelete = async (tabId: string) => {
		try {
			await deleteTab(tabId)
			toast.success('Категория успешно удалена')
		} catch (error) {
			console.error('Delete tab error:', error)
			toast.error(getErrorMessage(error))
		} finally {
			setDeletingTabId(null)
		}
	}

	const tabBeingDeleted = tabs.find((t) => t.id === deletingTabId)

	return (
		<>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={sortedIds}
					strategy={verticalListSortingStrategy}
				>
					<div className='bg-[#1f1f1f] rounded-xl text-white shadow-md border border-[#1f1f1f] overflow-hidden'>
						<table className='w-full'>
							<thead className='bg-[#1f1f1f] border-b border-[#272727] shadow-sm'>
								<tr>
									<th className='w-10 px-4 py-3'></th>
									<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
										Название
									</th>
									<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
										Slug
									</th>
									<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
										Порядок
									</th>
									<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
										Статус
									</th>
									<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
										Действия
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-[#272727]'>
								{sortedIds.map((id, index) => {
									const tab = tabMap.get(id)
									return tab ? (
										<SortableTabRow
											key={id}
											tab={tab}
											index={index}
											onEdit={onEdit}
											onDelete={() => setDeletingTabId(tab.id)}
											isDeleting={isDeletingTab && deletingTabId === tab.id}
										/>
									) : null
								})}
							</tbody>
						</table>
					</div>
				</SortableContext>
			</DndContext>

			<ConfirmDeleteModal
				isOpen={!!tabBeingDeleted}
				onClose={() => setDeletingTabId(null)}
				onConfirm={() => tabBeingDeleted && handleDelete(tabBeingDeleted.id)}
				description={
					tabBeingDeleted
						? `Вы действительно хотите удалить категорию "${tabBeingDeleted.label}"? Все проекты в этой категории будут удалены.`
						: ''
				}
				entityName='категорию'
				isDeleting={isDeletingTab}
			/>
		</>
	)
}
