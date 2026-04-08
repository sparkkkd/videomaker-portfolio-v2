'use client'

import { GradientRect } from './GradientRect'

export const AnimatedGradientRects = () => {
	return (
		<div className='absolute inset-0 flex items-end gap-0'>
			<GradientRect delay={0} className='h-[153px] lg:h-[454px]' />
			<GradientRect delay={0.1} className='h-[116px] lg:h-[345px]' />
			<GradientRect delay={0.2} className='h-[94px] lg:h-[278px]' />
			<GradientRect delay={0.3} className='h-[76px] lg:h-[226px]' />
			<GradientRect delay={0.4} className='h-[45px] lg:h-[134px]' />
			<GradientRect delay={0.5} className='h-[30px] lg:h-[80px]' />
			<GradientRect delay={0.4} className='h-[45px] lg:h-[134px]' />
			<GradientRect delay={0.3} className='h-[76px] lg:h-[226px]' />
			<GradientRect delay={0.2} className='h-[94px] lg:h-[278px]' />
			<GradientRect delay={0.1} className='h-[116px] lg:h-[345px]' />
			<GradientRect
				delay={0}
				className='h-[153px] lg:h-[454px] lg:!w-[110px]'
			/>
		</div>
	)
}
