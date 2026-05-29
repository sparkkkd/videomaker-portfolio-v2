import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

interface BaseProps {
	className?: string
	children: ReactNode
	variant?: 'white' | 'black'
	fullWidth?: boolean
	outline?: boolean
}

type ButtonVariant = BaseProps &
	ButtonHTMLAttributes<HTMLButtonElement> & { link?: false; href?: never }
type LinkVariant = BaseProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & { link: true; href: string }

export type ButtonProps = ButtonVariant | LinkVariant

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		variant = 'white',
		fullWidth = true,
		outline = false,
		link = false,
		href,
		...rest
	} = props

	const classes = twMerge(
		className,
		'flex items-center justify-center rounded-[10px] py-[15px] text-[18px] font-semibold transition-colors duration-300',
		'lg:py-[20px] lg:rounded-[100px] lg:text-[24px]',
		'xl:text-[32px]',
		fullWidth && 'w-full',
		variant === 'white' && 'text-[#1C1C1C] bg-white hover:bg-[#8F8F8F]',
		variant === 'black' &&
			'text-white bg-[#000] hover:bg-white hover:text-black',
		outline && 'border border-black bg-white hover:border-transparent',
	)

	if (link && href) {
		return (
			<Link
				href={href}
				className={classes}
				{...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{children}
			</Link>
		)
	}

	return (
		<button
			className={classes}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	)
}
