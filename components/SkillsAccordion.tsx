'use client'
import { ISkill, SKILLS_DATA } from '@/constants/skills.data'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface SkillsAccordionProps {
	className?: string
}

export const SkillsAccordion = ({ className }: SkillsAccordionProps) => {
	return (
		<div className={twMerge(className, 'flex flex-col gap-[10px]', 'xl:gap-5')}>
			{SKILLS_DATA.map((item) => (
				<AccodionItem key={item.id} {...item} />
			))}
		</div>
	)
}

const AccodionItem = ({ answers, title, titleBreak }: ISkill) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div
			className={twMerge(
				'py-[15px] pl-5 pr-[35px] flex flex-col bg-[#fff] rounded-[10px] cursor-pointer relative',
				'lg:py-[20px]',
				'xl:py-[25px] xl:px-[35px] xl:rounded-[20px]',
			)}
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<div className='relative w-full'>
				<h4
					className={twMerge(
						'text-sm font-semibold leading-[120%]',
						'md:text-[19px]',
						'lg:text-2xl',
						'xl:text-[32px]',
					)}
				>
					{title}

					<br className='hidden xl:block' />

					<span className='hidden xl:inline'>{titleBreak}</span>

					<span className='xl:hidden'>{titleBreak && ` ${titleBreak}`}</span>
				</h4>
				<div
					className={twMerge(
						'w-[15px] h-[15px] absolute top-1/2 right-[-15px] -translate-y-1/2 transition-all duration-300',
						'md:w-[20px] md:h-[20px]',
						'lg:w-[27px] lg:h-[27px]',
						'xl:w-[35px] xl:h-[35px]',
						isOpen && 'rotate-45',
					)}
				>
					<span
						className={twMerge(
							'w-[2px] h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black',
							'lg:w-[3px]',
						)}
					></span>
					<span
						className={twMerge(
							'w-full h-[2px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black',
							'lg:h-[3px]',
						)}
					></span>
				</div>
			</div>

			<div className={twMerge('max-w-full', 'xl:max-w-[409px]')}>
				<AnimatePresence mode='wait'>
					{isOpen && (
						<motion.div
							className='overflow-hidden'
							initial='collapsed'
							animate='open'
							exit='collapsed'
							variants={{
								open: {
									opacity: 1,
									height: 'auto',
									transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
								},
								collapsed: {
									opacity: 0,
									height: 0,
									transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
								},
							}}
						>
							<div
								className={twMerge(
									'pt-[10px] flex flex-col gap-[10px]',
									'md:pt-5',
								)}
							>
								{answers.map((answer) => (
									<p
										className={twMerge(
											'text-[10px] leading-[130%] opacity-70',
											'md:text-[14px]',
											'lg:text-[20px]',
										)}
										key={answer.id}
									>
										{answer.text}
									</p>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
