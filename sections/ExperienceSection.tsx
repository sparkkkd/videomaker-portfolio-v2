import { Container } from '@/components/Container'
import { experience } from '@/components/Experience/experience.data'
import { Timeline } from '@/components/Experience/TimeLine'
import { TimelineContent } from '@/components/Experience/TimelineContent'

export const ExperienceSection = () => {
	return (
		<section className='bg-[#D6FA03] relative z-10'>
			<div className='py-[104px] bg-[#1C1C1C] text-white rounded-[80px]'>
				<Container>
					<div className='grid grid-cols-[300px_100px_1fr] gap-8'>
						{/* LEFT */}
						<div>
							<h2 className='text-[64px] font-semibold leading-[90%]'>
								Опыт <br /> работы
							</h2>
						</div>

						{/* CENTER */}
						<Timeline />

						{/* RIGHT */}
						<div className='mt-[23px] flex flex-col gap-16'>
							{experience.map((item) => (
								<TimelineContent key={item.id} item={item} />
							))}
						</div>
					</div>
				</Container>
			</div>
		</section>
	)
}
