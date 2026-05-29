'use client'

import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

import Image from 'next/image'

import { Container } from '@/components/Container'
import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

interface ShowreelProps {
	className?: string
}

const videoJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'VideoObject',
	name: 'Шоурил работ — Дмитрий Кузьмин',
	description:
		'Подборка лучших проектов по видеосъёмке, монтажу и motion design',
	thumbnailUrl: 'https://dmitrikuzmin.ru/showreel-preview.jpg',
	uploadDate: '2024-12-22',
	duration: 'PT2M12S',
	contentUrl: 'https://vimeo.com/1041491730',
	embedUrl: 'https://player.vimeo.com/video/1041491730',
	interactionStatistic: {
		'@type': 'InteractionCounter',
		interactionType: 'https://schema.org/WatchAction',
		userInteractionCount: 0,
	},
}

export const Showreel = ({ className }: ShowreelProps) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	const handleVideoPlay = () => {
		if (videoRef.current) {
			setIsPlaying(true)
			videoRef.current.play()
		}
		setIsPlaying(true)
	}

	return (
		<section
			className={twMerge(
				className,
				'mt-[-50px] mb-[-20px] relative',
				'md:mt-[-110px] md:mb-[-70px]',
			)}
		>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
			/>

			<Container>
				<div className='w-full relative aspect-[16/9]'>
					<Image
						src='/showreel-v3.png'
						className={twMerge(
							'mx-auto object-contain select-none pointer-events-none z-20 relative',
						)}
						alt='Monitor frame'
						width={1209}
						height={1262}
						priority
					/>
					<AnimatePresence>
						{!isPlaying && (
							<motion.div
								key='preview'
								className='w-[80%] left-[10%] top-[6%] cursor-pointer absolute inset-0 z-[12]'
								onClick={handleVideoPlay}
								role='button'
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										handleVideoPlay()
									}
								}}
								aria-label='Воспроизвести шоурил'
								initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
								animate={{
									opacity: 1,
									scale: 1,
									filter: 'blur(0px)',
								}}
								exit={{
									opacity: 0,
									scale: 0.95,
									filter: 'blur(10px)',
								}}
								transition={{ duration: 0.6, ease: 'easeInOut' }}
							>
								<Image
									src='/showreel-preview.jpg'
									className='w-full absolute left-0 top-0 object-contain'
									alt='Press to play'
									width={1672}
									height={1049}
									loading='eager'
									style={{ willChange: 'opacity, transform' }}
								/>
							</motion.div>
						)}
					</AnimatePresence>

					{isPlaying && (
						<div className='w-[80%] aspect-[16/9] absolute left-[10%] top-[8.5%] z-[11]'>
							<iframe
								className='w-full h-full relative z-10 scale-[100%]'
								src='https://player.vimeo.com/video/1041491730?autoplay=1&loop=1&mute=1&title=0&byline=0&portrait=0&controls=1'
								allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
								allowFullScreen
								title='Showreel video'
								referrerPolicy='no-referrer-when-downgrade'
								loading='lazy'
							/>
							<div className='absolute inset-0 top-[-4%] h-[110%] bg-black z-0' />
						</div>
					)}
				</div>
			</Container>

			<Image
				src='/showreel-bg.svg'
				className='absolute select-none pointer-events-none object-contain z-0'
				alt='SHOWREEL'
				fill
			/>
		</section>
	)
}
