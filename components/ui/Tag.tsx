import { twMerge } from 'tailwind-merge'

interface TagProps {
	className?: string
	label: string
}

export const Tag = ({ className, label }: TagProps) => {
	return (
		<div
			className={twMerge(
				className,
				'py-1 px-2 bg-[#CDFA03] text-black text-[10px] text-center font-medium rounded-full shadow-[6px_6px_30px_0px_rgba(0,0,0,0.33)] leading-normal font-sans normal-case',
				'md:text-[14px] md:px-3',
				'lg:text-[18px]',
				'xl:text-[24px] lg:px-4',
			)}
		>
			{label}
		</div>
	)
}
