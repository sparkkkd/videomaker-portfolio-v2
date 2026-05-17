'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twMerge } from 'tailwind-merge'

import { tabSchema, type TabFormData } from '@/lib/schemas/admin.schemas'
import {
	CreateTabRequest,
	Tab,
	UpdateTabRequest,
} from '@/lib/api/types/tabs.types'
import { AdminModal } from '../AdminModal'
import { useCreateTab, useUpdateTab } from '@/lib/api/hooks/tabs.hooks'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@/lib/utils/errorHandlers'

interface CreateEditTabModalProps {
	isOpen: boolean
	onClose: () => void
	tab?: Tab | null
}

export function CreateEditTabModal({
	isOpen,
	onClose,
	tab,
}: CreateEditTabModalProps) {
	const isEdit = !!tab

	const { mutateAsync: createTab, isPending: isCreating } = useCreateTab()
	const { mutateAsync: updateTab, isPending: isUpdating } = useUpdateTab()

	const isMutating = isCreating || isUpdating

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TabFormData>({
		resolver: zodResolver(tabSchema),
		defaultValues: tab
			? {
					label: tab.label,
					slug: tab.slug,
					isActive: tab.isActive,
				}
			: {
					label: '',
					slug: '',
					isActive: true,
				},
	})

	const onSubmit = async (data: TabFormData) => {
		try {
			if (isEdit && tab) {
				const payload: UpdateTabRequest = {
					label: data.label,
					slug: data.slug,
					isActive: data.isActive,
				}

				await updateTab({ id: tab.id, data: payload })
				toast.success('Таб успешно обновлён')
			} else {
				const payload: CreateTabRequest = {
					label: data.label,
					slug: data.slug,
					isActive: data.isActive,
				}
				await createTab(payload)
				toast.success('Таб успешно создан')
			}
			onClose()
			reset()
		} catch (error: unknown) {
			console.error('Error saving tab:', error)
			toast.error(getErrorMessage(error))
		}
	}

	useEffect(() => {
		if (isOpen) {
			if (tab) {
				reset({
					label: tab.label,
					slug: tab.slug,
					isActive: tab.isActive,
				})
			} else {
				reset({
					label: '',
					slug: '',
					isActive: true,
				})
			}
		}
	}, [isOpen, tab, reset])

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={isEdit ? 'Редактировать таб' : 'Создать таб'}
			size='md'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				{/* Label */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Название <span className='text-rose-500'>*</span>
					</label>
					<input
						{...register('label')}
						className={twMerge(
							'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
							'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/70',
							errors.label && 'border-rose-500 focus:ring-rose-500/50',
						)}
						placeholder='Моушен-дизайн'
						disabled={isMutating}
					/>
					{errors.label && (
						<p className='mt-1 text-sm text-rose-400'>{errors.label.message}</p>
					)}
				</div>

				{/* Slug */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Slug <span className='text-rose-500'>*</span>
					</label>
					<input
						{...register('slug')}
						className={twMerge(
							'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
							'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/70 font-mono text-sm',
							errors.slug && 'border-rose-500 focus:ring-rose-500/50',
						)}
						placeholder='motion-design'
						disabled={isMutating}
					/>
					{errors.slug && (
						<p className='mt-1 text-sm text-rose-400'>{errors.slug.message}</p>
					)}
				</div>

				{/* Active */}
				<div className='grid grid-cols-2 gap-4'>
					<div className='flex items-end'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								{...register('isActive')}
								className='w-4 h-4 rounded border-[#272727] bg-[#272727] text-accent focus:ring-accent/50'
								disabled={isMutating}
							/>
							<span className='text-sm text-gray-300'>Активен</span>
						</label>
					</div>
				</div>

				{/* Actions */}
				<div className='flex items-center justify-end gap-3 pt-4 border-t border-[#272727]'>
					<button
						type='button'
						onClick={onClose}
						disabled={isMutating}
						className='px-5 py-2 font-semibold text-gray-300 hover:text-white hover:bg-[#272727] rounded-lg transition-colors disabled:opacity-50'
					>
						Отмена
					</button>
					<button
						type='submit'
						disabled={isMutating}
						className={twMerge(
							'px-5 py-2 bg-accent text-white font-semibold rounded-lg',
							'hover:bg-accent/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
							'flex items-center gap-2',
						)}
					>
						{isMutating ? (
							<>
								<span className='animate-spin rounded-full h-4 w-4 border-2 border-dark border-t-transparent' />
								Сохранение...
							</>
						) : (
							'Сохранить'
						)}
					</button>
				</div>
			</form>
		</AdminModal>
	)
}
