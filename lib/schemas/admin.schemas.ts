import { z } from 'zod'

export const tabSchema = z.object({
	label: z
		.string()
		.min(2, 'Минимум 2 символа')
		.max(100, 'Максимум 100 символов'),
	slug: z
		.string()
		.min(2, 'Минимум 2 символа')
		.max(100, 'Максимум 100 символов')
		.regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефис'),
	isActive: z.boolean().default(true).optional(),
})

export type TabFormData = z.infer<typeof tabSchema>

export const projectSchema = z.object({
	label: z
		.string()
		.min(2, 'Минимум 2 символа')
		.max(200, 'Максимум 200 символов'),
	slug: z
		.string()
		.min(2, 'Минимум 2 символа')
		.max(200, 'Максимум 200 символов')
		.regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефис'),
	description: z.string().max(1000, 'Максимум 1000 символов'),
	src: z
		.string()
		.min(1, 'Укажите путь или загрузите файл')
		.max(500, 'Слишком длинный путь'),
	href: z
		.string()
		.url('Невалидный URL')
		.max(500, 'Слишком длинная ссылка')
		.optional()
		.or(z.literal('')),
	isActive: z.boolean().default(true).optional(),
	tabId: z.string().min(1, 'Выберите раздел'),
})

export const projectCreateSchema = projectSchema.extend({
	src: z
		.union([
			z.string().min(1).max(500),
			z
				.instanceof(File)
				.refine((file) => file.size <= 5 * 1024 * 1024, 'Максимум 5MB'),
		])
		.optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
export type ProjectCreateFormData = z.infer<typeof projectCreateSchema>
