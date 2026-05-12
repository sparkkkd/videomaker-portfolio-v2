'use client'

import { twMerge } from 'tailwind-merge'
import { AnimatePresence, motion } from 'framer-motion'
import { IProject } from '@/lib/api/types'

interface AdminProjectsListViewProps {
	className?: string
	projects: IProject[]
}

export const AdminProjectsListView = ({
	className,
	projects,
}: AdminProjectsListViewProps) => {
	return (
		<div
			className={twMerge(
				className,
				'bg-[#1f1f1f] rounded-xl text-white shadow-md border border-[#1f1f1f] overflow-hidden',
			)}
		>
			<table className='w-full'>
				<thead className='bg-[#1f1f1f] border-b border-[#272727] shadow-sm'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Превью
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Название
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Статус
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Порядок
						</th>
						<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Действия
						</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-[#272727]'>
					<AnimatePresence>
						{projects.map((project) => (
							<motion.tr
								key={project.id}
								layout
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className='hover:bg-secondary transition-colors duration-200'
							>
								{/* Превью */}
								<td className='px-6 py-4'>
									<div className='w-14 h-10 rounded-lg overflow-hidden bg-[#272727] flex-shrink-0 border border-[#272727]'>
										{project.src ? (
											<img
												src={project.src}
												alt={project.label}
												className='w-full h-full object-cover'
											/>
										) : (
											<div className='w-full h-full flex items-center justify-center text-gray-500 text-[10px]'>
												Нет
											</div>
										)}
									</div>
								</td>

								<td className='px-6 py-4'>
									<div className='font-medium text-white'>{project.label}</div>
									{project.description && (
										<div className='text-sm text-gray-400 truncate max-w-xs mt-0.5'>
											{project.description}
										</div>
									)}
								</td>

								<td className='px-6 py-4'>
									<span
										className={twMerge(
											'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
											project.isActive
												? 'bg-[#272727] text-teal-500 font-semibold'
												: 'bg-[#272727] text-gray-400',
										)}
									>
										{project.isActive ? 'Активен' : 'Скрыт'}
									</span>
								</td>

								<td className='px-6 py-4'>
									<span className='text-white'>{project.order}</span>
								</td>

								<td className='px-6 py-4 text-right space-x-5'>
									<button className='text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors duration-200'>
										Редактировать
									</button>
									<button className='text-rose-800 hover:text-rose-600 text-sm font-medium transition-colors duration-200'>
										Удалить
									</button>
								</td>
							</motion.tr>
						))}
					</AnimatePresence>
				</tbody>
			</table>

			{projects.length === 0 && (
				<div className='text-center py-12 text-gray-400'>
					Нет проектов. Создайте первый!
				</div>
			)}
		</div>
	)
}
