export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-secondary flex items-center justify-center'>
			{children}
		</div>
	)
}
