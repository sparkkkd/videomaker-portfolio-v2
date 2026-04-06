'use client'

import {
	fadeInUp,
	fadeInUpDelay,
	staggerChildren,
} from '@/constants/animation.constant'
import { motion } from 'framer-motion'

import Image from 'next/image'

export const AnimatedResumeIntro = ({}) => {
	return (
		<motion.div
			className='text-[88px] font-semibold mx-auto w-full text-center flex flex-col items-center gap-y-[25px] leading-[90%]'
			variants={staggerChildren}
			initial='initial'
			animate='animate'
		>
			<motion.div className='w-full flex' variants={fadeInUp}>
				<span>привет, меня зовут</span>{' '}
				<Image
					src='/avatar.png'
					alt=''
					width={89}
					height={89}
					className='ml-5'
				/>{' '}
				<span className='ml-[11px] py-[27px] pt-[20px] px-[38px] flex items-center justify-center w-fit leading-[90%] text-white rounded-full text-[44px] bg-[#000]'>
					Дмитрий
				</span>{' '}
			</motion.div>
			<motion.div
				className='w-full flex leading-none'
				variants={fadeInUpDelay(0.3)}
			>
				<span>я</span>{' '}
				<motion.div
					className='ml-[20px] py-[27px] px-[38px] text-white text-[44px] bg-[#000] flex rounded-full gap-[30px]'
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
						<Image src='/montage-icon.svg' alt='' width={53} height={53} />
						монтажер
					</motion.span>
					<motion.span
						className='flex items-center gap-[10px]'
						variants={fadeInUpDelay(1.7)}
					>
						<Image src='/motion-icon.svg' alt='' width={53} height={53} />
						моушен
					</motion.span>
					<motion.span
						className='flex items-center gap-[10px]'
						variants={fadeInUpDelay(2)}
					>
						<Image src='/design-icon.svg' alt='' width={53} height={53} />
						дизайнер
					</motion.span>
				</motion.div>
			</motion.div>
			<motion.div
				className='w-full flex leading-none'
				variants={fadeInUpDelay(2.4)}
			>
				из города
				<Image
					src='/city.png'
					alt=''
					width={89}
					height={89}
					className='ml-[20px]'
				/>
				<div className='ml-[13px] py-[27px] pt-[20px] px-[38px] text-white text-[44px] bg-[#000] flex rounded-full'>
					Рязань
				</div>
			</motion.div>
		</motion.div>
	)
}
