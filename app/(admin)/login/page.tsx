'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { motion } from 'framer-motion'

import { api } from '@/lib/api/axios'
import { ITokenResponse } from '@/lib/api/types'
import { auth } from '@/lib/auth/auth'

import Image from 'next/image'

import { LoginField } from '@/components/admin/LoginField'
import { handleLoginError } from '@/lib/utils/errorHandlers'

const loginSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(6, 'Минимум 6 символов'),
})

type TLoginForm = z.infer<typeof loginSchema>

export default function Login() {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = useCallback(
		async (data: TLoginForm) => {
			if (loading) return

			setError(null)
			setLoading(true)

			try {
				const response = await api.post<ITokenResponse>('/auth/login', data, {
					headers: {
						'content-type': 'application/json',
					},
				})

				auth.setAccessToken(response.accessToken)

				router.replace('/admin')
			} catch (error: unknown) {
				setError(handleLoginError(error))
			} finally {
				setLoading(false)
			}
		},
		[loading, router],
	)

	return (
		<div
			className={twMerge(
				'py-5 min-h-screen flex flex-col items-center justify-center bg-secondary',
			)}
		>
			<div className={twMerge('flex flex-col items-center gap-4')}>
				<Image
					src='/logo.svg'
					alt='logo'
					width={100}
					height={100}
					className={twMerge('h-auto md:w-[150px] md:h-auto')}
				/>
				<span
					className={twMerge(
						'text-2xl text-white font-semibold',
						'md:text-3xl',
					)}
				>
					Панель управления
				</span>
			</div>

			<div
				className={twMerge(
					'mt-5 p-6 flex items-center justify-center bg-[#232323] shadow-lg rounded-2xl',
					'md:w-[500px]',
				)}
			>
				<form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-6'>
					{error && (
						<div
							className={twMerge(
								'text-red-700 text-center text-sm',
								'md:text-lg',
							)}
						>
							{error}
						</div>
					)}

					<LoginField
						label='Email'
						type='email'
						register={register('email')}
						disabled={loading}
						error={errors.email}
						placeholder='admin@admin.com'
					/>

					<LoginField
						label='Пароль'
						type='password'
						register={register('password')}
						disabled={loading}
						error={errors.password}
						placeholder='••••••••'
					/>

					<button
						className={twMerge(
							'w-full min-h-10 flex items-center justify-center bg-accent text-white py-2 rounded-lg transition-colors duration-300 hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed',
							loading && 'bg-[#fd8d3d] cursor-not-allowed',
							'md:text-xl md:min-h-11',
						)}
						type='submit'
					>
						{loading ? (
							<motion.div
								className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent'
								initial={{ opacity: 1 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1 }}
							/>
						) : (
							<motion.span
								initial={{ opacity: 1 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1 }}
							>
								Войти
							</motion.span>
						)}
					</button>
				</form>
			</div>
		</div>
	)
}
