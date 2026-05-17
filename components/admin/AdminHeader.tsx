'use client'

import { twMerge } from 'tailwind-merge'

import { useAdminStore, AdminSections } from '@/lib/store/admin.store'
import { auth } from '@/lib/auth/auth'

import { Container } from '../Container'

interface AdminHeaderProps {
	className?: string
}

const SECTIONS: { id: AdminSections; label: string }[] = [
	{ id: 'tabs', label: 'Табы' },
	{ id: 'projects', label: 'Проекты' },
	{ id: 'tabs-projects', label: 'Проекты по табам' },
]

export const AdminHeader = ({ className }: AdminHeaderProps) => {
	const { activeSection, setActiveSection } = useAdminStore()

	const handleLogout = async () => {
		await auth.logout()
	}

	return (
		<header
			className={twMerge(
				className,
				'py-5 sticky top-0 z-40 bg-[#1c1c1c] shadow-lg text-white',
			)}
		>
			<Container>
				<div className='flex justify-between'>
					<nav className='flex gap-4'>
						{SECTIONS.map((section) => {
							const isActive = activeSection === section.id
							return (
								<button
									key={section.id}
									className={twMerge(
										'px-4 py-3 flex items-center gap-1 text-lg font-medium transition-colors duration-300',
										!isActive && 'hover:text-accent/70',
										isActive && 'text-accent',
									)}
									onClick={() => setActiveSection(section.id)}
								>
									{section.label}
								</button>
							)
						})}
					</nav>
					<button
						onClick={handleLogout}
						className={twMerge(
							'flex items-center justify-center text-lg transition-colors duration-300',
							'hover:text-accent/70',
						)}
					>
						Выйти
					</button>
				</div>
			</Container>
		</header>
	)
}
