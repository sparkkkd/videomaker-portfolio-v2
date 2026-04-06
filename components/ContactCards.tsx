import { twMerge } from 'tailwind-merge'

import Image from 'next/image'
import Link from 'next/link'

import { CONTACTS } from '@/constants/contacts.constant'

interface ContactCardsProps {
	className?: string
}

export const ContactCards = ({ className }: ContactCardsProps) => {
	return (
		<div className={twMerge(className, 'mt-[60px] flex gap-[30px]')}>
			{CONTACTS.map(({ id, title, label, href, external }) => {
				const externalProps = external
					? { target: '_blank', rel: 'noopener noreferrer' }
					: {}

				return (
					<Link key={id} href={href} {...externalProps}>
						<div
							className={twMerge(
								'py-[25px] px-[30px] w-[300px] h-[180px] relative flex flex-col rounded-[15px] hover:translate-1 transition-all duration-300',
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
									'text-[20px] leading-[120%] opacity-70',
									id === 'telegram_contact'
										? 'flex items-center justify-between font-semibold'
										: 'font-normal',
								)}
							>
								{title}
								{id === 'telegram_contact' && (
									<Image src='/star.svg' alt='' width={27} height={27} />
								)}
							</div>
							<h4 className='mt-auto font-semibold text-[20px] leading-[130%]'>
								{label}
							</h4>
						</div>
					</Link>
				)
			})}
		</div>
	)
}
