import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import Link from 'next/link'

import { CONTACTS } from '@/constants/contacts.constant'

interface ContactCardsProps {
	className?: string
}

export const ContactCards = ({ className }: ContactCardsProps) => {
	return (
		<div
			className={twMerge(
				className,
				'mt-5 flex flex-col gap-[10px]',
				'lg:mt-[60px] lg:flex-row lg:gap-[30px]',
			)}
		>
			{CONTACTS.map(({ id, title, label, href, external }) => {
				const externalProps = external
					? { target: '_blank', rel: 'noopener noreferrer' }
					: {}

				return (
					<Link key={id} href={href} {...externalProps}>
						<div
							className={twMerge(
								'p-[15px] w-[260px] h-[80px] relative flex flex-col rounded-[5px]',
								'lg:py-[25px] lg:px-[30px] lg:w-[300px] lg:h-[180px] lg:rounded-[15px] lg:hover:translate-1 lg:transition-all lg:duration-300',
								id === 'telegram_contact' ? 'bg-[#DAFF00]' : 'bg-[#E3E3E3]',
							)}
						>
							{id === 'telegram_contact' && (
								<Image
									src='/telegram-bg.svg'
									alt=''
									width={286}
									height={244}
									className='absolute right-[0px] top-[-10px]'
								/>
							)}

							<div
								className={twMerge(
									'text-[14px] opacity-70',
									'lg:text-[20px] lg:leading-[120%]',
									id === 'telegram_contact'
										? 'flex items-start lg:items-center justify-between font-semibold'
										: 'font-normal',
								)}
							>
								{title}
								{id === 'telegram_contact' && (
									<Image src='/star.svg' alt='' width={27} height={27} />
								)}
							</div>
							<h4
								className={twMerge(
									'text-[14px] mt-auto font-semibold',
									'lg:text-[20px] lg:leading-[130%]',
								)}
							>
								{label}
							</h4>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
