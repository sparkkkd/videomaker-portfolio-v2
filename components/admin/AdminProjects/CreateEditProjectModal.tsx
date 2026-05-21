'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twMerge } from 'tailwind-merge'
import toast from 'react-hot-toast'

import { getErrorMessage } from '@/lib/utils/errorHandlers'

import {
	projectCreateSchema,
	type ProjectCreateFormData,
} from '@/lib/schemas/admin.schemas'
import { Tab } from '@/lib/api/types/tabs.types'
import { CreateProjectRequest, Project } from '@/lib/api/types/project.types'

import { useUploadFile } from '@/lib/api/hooks/uploads.hooks'
import {
	useCreateProject,
	useUpdateProject,
} from '@/lib/api/hooks/projects.hooks'

import { AdminModal } from '../AdminModal'
import { getFullImageUrl } from '@/lib/utils/getFullImageUrl'

interface CreateEditProjectModalProps {
	isOpen: boolean
	onClose: () => void
	project?: Project | null
	availableTabs: Tab[]
}

export function CreateEditProjectModal({
	isOpen,
	onClose,
	project,
	availableTabs,
}: CreateEditProjectModalProps) {
	const isEdit = !!project

	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [isUploadingImage, setIsUploadingImage] = useState(false)

	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutateAsync: createProject, isPending: isCreating } =
		useCreateProject()
	const { mutateAsync: updateProject, isPending: isUpdating } =
		useUpdateProject()
	const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()

	const isMutating = isCreating || isUpdating || isUploading

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<ProjectCreateFormData>({
		resolver: zodResolver(projectCreateSchema),
		defaultValues: project
			? {
					label: project.label,
					slug: project.slug,
					description: project.description,
					src: project.src,
					href: project.href ?? undefined,
					isActive: project.isActive,
					tabId: project.tab.id,
				}
			: {
					label: '',
					slug: '',
					description: '',
					src: '',
					href: '',
					isActive: true,
					tabId: availableTabs[0]?.id || '',
				},
	})

	const selectedFile = watch('src') as File | string | undefined

	useEffect(() => {
		if (selectedFile instanceof File) {
			const url = URL.createObjectURL(selectedFile)
			setPreviewUrl(url)
			return () => URL.revokeObjectURL(url)
		} else if (typeof selectedFile === 'string' && selectedFile) {
			setPreviewUrl(selectedFile)
		} else {
			setPreviewUrl(null)
		}
	}, [selectedFile])

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		try {
			setIsUploadingImage(true)

			const blobUrl = URL.createObjectURL(file)
			setPreviewUrl(blobUrl)

			const response = await uploadFile({ file, folder: 'projects' })

			setValue('src', response.path, { shouldValidate: true })
			setPreviewUrl(response.path)

			toast.success('Изображение успешно загружено')
		} catch (error: unknown) {
			console.error('Upload error:', error)
			toast.error(getErrorMessage(error))

			setValue('src', '', { shouldValidate: true })
			setPreviewUrl(null)
			if (fileInputRef.current) fileInputRef.current.value = ''
		} finally {
			setIsUploadingImage(false)
		}
	}

	const onSubmit = async (data: ProjectCreateFormData) => {
		try {
			const payload: CreateProjectRequest = {
				label: data.label,
				slug: data.slug,
				description: data.description,
				src: data.src as string,
				href: data.href === '' ? null : data.href || null,
				isActive: data.isActive,
				tabId: data.tabId,
			}

			if (isEdit && project) {
				await updateProject({ id: project.id, data: payload })
				toast.success('Проект успешно обновлён')
			} else {
				await createProject(payload)
				toast.success('Проект успешно создан')
			}

			onClose()
			reset()
			setPreviewUrl(null)
			if (fileInputRef.current) fileInputRef.current.value = ''
		} catch (error: unknown) {
			console.error('Error saving project:', error)
			toast.error(getErrorMessage(error))
		}
	}

	useEffect(() => {
		if (isOpen) {
			if (project) {
				reset({
					label: project.label,
					slug: project.slug,
					description: project.description,
					src: project.src,
					href: project.href ?? '',
					isActive: project.isActive,
					tabId: project.tab.id,
				})
				setPreviewUrl(project.src || null)
			} else {
				reset({
					label: '',
					slug: '',
					description: '',
					src: '',
					href: '',
					isActive: true,
					tabId: availableTabs[0]?.id || '',
				})
				setPreviewUrl(null)
				if (fileInputRef.current) {
					fileInputRef.current.value = ''
				}
			}
		}
	}, [isOpen, project, availableTabs, reset])

	return (
		<AdminModal
			isOpen={isOpen}
			onClose={onClose}
			title={isEdit ? 'Редактировать проект' : 'Создать проект'}
			size='lg'
		>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				{/* Preview + File Upload */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-2'>
						Обложка проекта
					</label>

					<div className='flex items-start gap-4'>
						{/* Preview */}
						<div className='w-24 h-16 rounded-lg overflow-hidden bg-[#272727] border border-[#272727] flex-shrink-0'>
							{previewUrl ? (
								<img
									src={getFullImageUrl(previewUrl)}
									alt='Preview'
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='w-full h-full flex items-center justify-center text-gray-500 text-xs'>
									Нет
								</div>
							)}
						</div>

						{/* Upload button */}
						<div className='flex-1'>
							<input
								ref={fileInputRef}
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='hidden'
								id='project-image'
								disabled={isMutating || isUploadingImage}
							/>
							<label
								htmlFor='project-image'
								className={twMerge(
									'inline-flex items-center gap-2 px-4 py-2 bg-[#272727] border border-[#272727]',
									'text-white text-sm font-medium rounded-lg cursor-pointer',
									'hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
								)}
							>
								📁 Выбрать изображение
							</label>
							<p className='mt-1.5 text-xs text-gray-500'>PNG, JPG до 5MB</p>
							{errors.src && typeof errors.src.message === 'string' && (
								<p className='mt-1 text-sm text-rose-400'>
									{errors.src.message}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Label + Slug */}
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-1.5'>
							Название <span className='text-rose-500'>*</span>
						</label>
						<input
							{...register('label')}
							className={twMerge(
								'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
								'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50',
								errors.label && 'border-rose-500 focus:ring-rose-500/50',
							)}
							placeholder='Промо-ролик'
							disabled={isMutating}
						/>
						{errors.label && (
							<p className='mt-1 text-sm text-rose-400'>
								{errors.label.message}
							</p>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-300 mb-1.5'>
							Slug <span className='text-rose-500'>*</span>
						</label>
						<input
							{...register('slug')}
							className={twMerge(
								'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
								'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono text-sm',
								errors.slug && 'border-rose-500 focus:ring-rose-500/50',
							)}
							placeholder='promo-rolik'
							disabled={isMutating}
						/>
						{errors.slug && (
							<p className='mt-1 text-sm text-rose-400'>
								{errors.slug.message}
							</p>
						)}
					</div>
				</div>

				{/* Tab Select */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Раздел <span className='text-rose-500'>*</span>
					</label>
					<select
						{...register('tabId')}
						className={twMerge(
							'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
							'text-white focus:outline-none focus:ring-2 focus:ring-accent/50',
							errors.tabId && 'border-rose-500 focus:ring-rose-500/50',
						)}
						disabled={isMutating || availableTabs.length === 0}
					>
						<option value=''>Выберите раздел</option>
						{availableTabs.map((tab) => (
							<option key={tab.id} value={tab.id}>
								{tab.label}
							</option>
						))}
					</select>
					{errors.tabId && (
						<p className='mt-1 text-sm text-rose-400'>{errors.tabId.message}</p>
					)}
				</div>

				{/* Description */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Описание <span className='text-rose-500'>*</span>
					</label>
					<textarea
						{...register('description')}
						rows={3}
						className={twMerge(
							'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg resize-none',
							'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50',
							errors.description && 'border-rose-500 focus:ring-rose-500/50',
						)}
						placeholder='Краткое описание проекта...'
						disabled={isMutating}
					/>
					{errors.description && (
						<p className='mt-1 text-sm text-rose-400'>
							{errors.description.message}
						</p>
					)}
				</div>

				{/* External Link */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-1.5'>
						Ссылка на проект
					</label>
					<input
						{...register('href')}
						className={twMerge(
							'w-full px-3 py-2.5 bg-[#272727] border border-[#272727] rounded-lg',
							'text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 font-mono text-sm',
							errors.href && 'border-rose-500 focus:ring-rose-500/50',
						)}
						placeholder='https://vimeo.com/...'
						disabled={isMutating}
					/>
					{errors.href && (
						<p className='mt-1 text-sm text-rose-400'>{errors.href.message}</p>
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

				{/* Buttons */}
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
