import { ITab } from '@/lib/api/types'
import { twMerge } from 'tailwind-merge'

interface AdminTabsProps {
	className?: string
	tabs: ITab[]
}

export const AdminTabs = ({ className, tabs }: AdminTabsProps) => {
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
							Название
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Slug
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Порядок
						</th>
						<th className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Статус
						</th>
						<th className='px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
							Действия
						</th>
					</tr>
				</thead>

				<tbody className='divide-y divide-[#272727]'>
					{tabs.map((tab) => (
						<tr
							key={tab.id}
							className='hover:bg-secondary transition-colors duration-200'
						>
							<td className='px-6 py-4'>
								<span className='font-medium text-dark'>{tab.label}</span>
							</td>
							<td className='px-6 py-4'>
								<code className='text-sm text-gray-400 bg-[#272727] px-2 py-1 rounded'>
									{tab.slug}
								</code>
							</td>
							<td className='px-6 py-4'>
								<span className='text-white'>{tab.order}</span>
							</td>
							<td className='px-6 py-4'>
								<span
									className={twMerge(
										'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
										tab.isActive
											? 'bg-[#272727] text-teal-500 font-semibold'
											: 'bg-[#272727] text-gray-400',
									)}
								>
									{tab.isActive ? 'Активен' : 'Скрыт'}
								</span>
							</td>
							<td className='px-6 py-4 text-right space-x-5'>
								<button className='text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors duration-200'>
									Редактировать
								</button>
								<button className='text-rose-800 hover:text-rose-600 text-sm font-medium transition-colors duration-200'>
									Удалить
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{tabs.length === 0 && (
				<div className='text-center py-12'>
					<p className='text-gray-500'>Нет табов. Создайте первый!</p>
				</div>
			)}
		</div>
	)
}
