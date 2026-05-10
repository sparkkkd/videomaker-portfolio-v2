'use client'

import { Button } from '@/components/ui/Button'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface ISidebarNav {
	name: string
	href: string
	icon: string
	disabled?: boolean
}

interface AdminSiderbarProps {
	className?: string
}

const ADMIN_NAVIGATIONS: ISidebarNav[] = [
	{ name: 'Табы', href: '/admin/tabs', icon: '📑' },
	{ name: 'Проекты', href: '/admin/projects', icon: '🎬' },
]

export const AdminSiderbar = ({ className }: AdminSiderbarProps) => {
	const pathname = usePathname()

	return (
		<aside className={twMerge(className, 'flex flex-col')}>
			<nav>
				{ADMIN_NAVIGATIONS.map((item) => {
					const isActive = pathname === item.href
					return (
						<Link
							key={item.href}
							href={item.href}
							className={twMerge(
								'px-4 py-3 flex items-center gap-1 text-sm font-medium',
								isActive ? 'text-accent' : 'text-secondary',
							)}
						>
							<span>{item.icon}</span>
							<span>{item.name}</span>
						</Link>
					)
				})}
			</nav>

			<div className={twMerge('p-4 border-t border-secondary/40')}>
				<Button
					onClick={() => {
						auth.logout()
						window.location.href = '/admin/login'
					}}
				>
					Выйти
				</Button>
			</div>
		</aside>
	)
}
