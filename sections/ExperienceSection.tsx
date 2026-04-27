import { Container } from '@/components/Container'
import { experience } from '@/components/Experience/experience.data'
import { Timeline } from '@/components/Experience/TimeLine'
import { TimelineContent } from '@/components/Experience/TimelineContent'
import { twMerge } from 'tailwind-merge'

export const ExperienceSection = () => {
	return (
		<section className='relative z-10'>
			<div
				className={twMerge(
					'py-[25px] bg-[#1C1C1C] text-white rounded-[15px]',
					'sm-custom:py-[30px]',
					'md:py-[40px]',
					'lg:pt-[70px] lg:pb-[55px] lg:rounded-[80px]',
					'xl:pt-[115px] xl:pb-[100px]',
				)}
			>
				<Container>
					<div
						className={twMerge(
							'grid grid-cols-1 gap-5',
							'md:gap-[30px]',
							'lg:gap-[70px]',
							'xl:grid-cols-[300px_100px_1fr] xl:gap-8',
						)}
					>
						{/* LEFT */}
						<h2
							className={twMerge(
								'text-[24px] font-semibold leading-[90%] text-center bg-[linear-gradient(140deg,#fff_0%,#fff_20%,#999_100%)] bg-clip-text text-transparent',
								'md:text-[42px]',
								'lg:text-[64px]',
								'xl:max-w-[303px] xl:text-left h-fit',
							)}
						>
							Мой опыт работы
						</h2>

						<div
							className={twMerge(
								'grid grid-cols-[20px_1fr] gap-5',
								'sm-custom:grid-cols-[50px_1fr]',
								'md:grid-cols-[160px_1fr] md:gap-10',
								'lg:gap-[46px]',
								'xl:col-span-2 xl:gap-8',
							)}
						>
							{/* CENTER */}
							<Timeline />

							{/* RIGHT */}
							<div
								className={twMerge(
									'mt-[23px] flex flex-col gap-4',
									'lg:gap-15',
									'xl:mt-0',
								)}
							>
								{experience.map((item, index) => (
									<TimelineContent
										key={item.id}
										item={item}
										isActive={index === experience.length - 1}
									/>
								))}
							</div>
						</div>
					</div>
				</Container>
			</div>
		</section>
	)
}
