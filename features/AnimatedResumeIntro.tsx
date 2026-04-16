'use client'

import {
	fadeInUp,
	fadeInUpDelay,
	staggerChildren,
} from '@/constants/animation.constant'
import { motion } from 'framer-motion'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export const AnimatedResumeIntro = ({}) => {
	return (
		<motion.div
			className={twMerge(
				'mx-auto w-full flex flex-col items-center font-semibold text-[20px] text-center',
				'lg:text-[88px] lg:gap-y-[25px] lg:leading-[90%]',
			)}
			variants={staggerChildren}
			initial='initial'
			animate='animate'
		>
			<motion.div
				className='w-full flex items-center justify-center'
				variants={fadeInUp}
			>
				<span>привет, меня зовут</span>{' '}
				<Image
					src='/avatar.png'
					alt=''
					width={89}
					height={89}
					className={twMerge(
						'ml-[5px] w-[30px] h-[30px] rounded-full',
						'lg:ml-5 lg:h-[89px] lg:w-[89px] lg:rounded-none',
					)}
				/>{' '}
				<span
					className={twMerge(
						'ml-[5px] py-[10px] px-[15px] mt-[-6px] w-fit flex items-center justify-center text-[14px] text-white rounded-full bg-[#000]',
						'lg:ml-[11px] lg:mr-0 lg:py-[27px] lg:pt-[20px] lg:px-[38px] lg:leading-[90%]  lg:text-[44px]',
					)}
				>
					Дмитрий
				</span>{' '}
			</motion.div>
			<motion.div
				className='w-full flex items-center justify-center leading-none mt-[10px] lg:mt-0'
				variants={fadeInUpDelay(0.3)}
			>
				<span>я</span>{' '}
				<motion.div
					className={twMerge(
						'ml-[5px] py-[10px] px-[15px] flex gap-[5px] text-white text-[14px] bg-[#000] rounded-full',
						'lg:ml-[20px] lg:py-[27px] lg:px-[38px] lg:text-[44px] lg:gap-[30px]',
					)}
					initial={{
						width: 0,
					}}
					animate={{
						width: 'auto',
						transition: { delay: 0.8, duration: 0.6, ease: 'easeInOut' },
					}}
					layout
				>
					<motion.span
						className='flex items-center gap-[10px]'
						variants={fadeInUpDelay(1.4)}
					>
						<Image
							src='/montage-icon.svg'
							alt=''
							width={53}
							height={53}
							className={twMerge(
								'w-[15px] h-[15px]',
								'lg:h-[53px] lg:w-[53px]',
							)}
						/>
						монтажер
					</motion.span>
					<motion.span
						className='flex items-center gap-[10px]'
						variants={fadeInUpDelay(1.7)}
					>
						<Image
							src='/motion-icon.svg'
							alt=''
							width={53}
							height={53}
							className={twMerge(
								'w-[15px] h-[15px]',
								'lg:h-[53px] lg:w-[53px]',
							)}
						/>
						моушен
					</motion.span>
					<motion.span
						className='flex items-center gap-[10px]'
						variants={fadeInUpDelay(2)}
					>
						<Image
							src='/design-icon.svg'
							alt=''
							width={53}
							height={53}
							className={twMerge(
								'w-[15px] h-[15px]',
								'lg:h-[53px] lg:w-[53px]',
							)}
						/>
						дизайнер
					</motion.span>
				</motion.div>
			</motion.div>
			<motion.div
				className='mt-[10px] lg:mt-0 w-full flex items-cente justify-center leading-none'
				variants={fadeInUpDelay(2.4)}
			>
				из города
				<Image
					src='/city.png'
					alt=''
					width={89}
					height={89}
					className={twMerge(
						'lg:ml-[5px] w-[30px] h-[30px] rounded-full border-1 border-[#000]',
						'lg:ml-5 lg:w-[89px] lg:h-[89px] lg:rounded-none lg:border-none',
					)}
				/>
				<div
					className={twMerge(
						'py-[10px] px-[15px] ml-[5px] text-white text-[14px] bg-[#000] flex rounded-full',
						'lg:ml-[13px] lg:py-[27px] lg:pt-[20px] lg:px-[38px] lg:text-[44px]',
					)}
				>
					Рязань
				</div>
			</motion.div>
		</motion.div>
	)
}
