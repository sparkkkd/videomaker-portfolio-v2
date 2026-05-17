'use client'

import { twMerge } from 'tailwind-merge'

import { AdminModal } from './AdminModal'

interface ConfirmDeleteModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void | Promise<void>
	title?: string
	description: string
	entityName: string
	isDeleting?: boolean
}

export function ConfirmDeleteModal({
	isOpen,
	onClose,
	onConfirm,
	title = 'Подтвердите удаление',
	description,
	entityName,
	isDeleting = false,
}: ConfirmDeleteModalProps) {
	const handleConfirm = async () => {
		await onConfirm()
		onClose()
	}

	return (
		<AdminModal isOpen={isOpen} onClose={onClose} title={title} size='sm'>
			<div className='space-y-6'>
				<p className='text-gray-300'>{description}</p>

				<div className='flex items-center justify-end gap-3 pt-4 border-t border-[#272727]'>
					<button
						type='button'
						onClick={onClose}
						disabled={isDeleting}
						className='px-5 py-2 font-semibold text-gray-300 hover:text-white hover:bg-[#272727] rounded-lg transition-colors disabled:opacity-50'
					>
						Отмена
					</button>
					<button
						type='button'
						onClick={handleConfirm}
						disabled={isDeleting}
						className={twMerge(
							'px-5 py-2 bg-rose-600 text-white font-semibold rounded-lg',
							'hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
							'flex items-center gap-2',
						)}
					>
						{isDeleting ? (
							<>
								<span className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent' />
								Удаление...
							</>
						) : (
							`Удалить ${entityName}`
						)}
					</button>
				</div>
			</div>
		</AdminModal>
	)
}
