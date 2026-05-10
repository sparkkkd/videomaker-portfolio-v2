import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface LoginFieldProps {
	label: string
	type?: React.HTMLInputTypeAttribute
	placeholder?: string
	disabled?: boolean
	register: UseFormRegisterReturn
	error: FieldError | undefined
}

export const LoginField = ({
	error,
	label,
	register,
	disabled,
	placeholder,
	type,
}: LoginFieldProps) => {
	return (
		<div className={twMerge('flex flex-col gap-2 w-full')}>
			<label
				className={twMerge(
					'w-full text-base font-medium text-accent',
					'md:text-xl',
				)}
			>
				{label}
			</label>
			<input
				className={twMerge(
					'p-2 text-white bg-transparent border border-accent rounded-lg transition-colors duration-300 focus:outline-none placeholder:text-gray-500/50',
					error && 'border-red-500 focus:ring-red-500',
				)}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				{...register}
			/>
			{error && (
				<p className={twMerge('text-red-500 text-sm')}>{error.message}</p>
			)}
		</div>
	)
}
