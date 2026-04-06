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
		<div className={twMerge(className, 'flex flex-col gap-[20px]')}>
			{SKILLS_DATA.map((item) => (
				<AccodionItem key={item.id} {...item} />
			))}
		</div>
	)
}

const AccodionItem = ({ answers, title }: ISkill) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div
			className='py-[25px] px-[35px] flex flex-col bg-[#fff] rounded-[20px] cursor-pointer relative'
			onClick={() => setIsOpen((prev) => !prev)}
		>
			<div className='relative w-full'>
				<h4 className='font-semibold text-[32px] leading-[120%]'>{title}</h4>
				<div
					className={twMerge(
						'w-[35px] h-[35px] absolute right-[35px] top-1/2 -translate-y-1/2 transition-all duration-300',
						isOpen && 'rotate-45',
					)}
				>
					<span className='w-[4px] h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black'></span>
					<span className='w-full h-[4px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black'></span>
				</div>
			</div>

			<div className='max-w-[409px]'>
				<AnimatePresence mode='wait'>
					{isOpen && (
						<motion.div
							className='flex flex-col gap-[10px] text-[20px] leading-[130%] opacity-70 overflow-hidden'
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
							<div className='pt-5 flex flex-col gap-[10px]'>
								{answers.map((answer) => (
									<p key={answer.id}>{answer.text}</p>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
