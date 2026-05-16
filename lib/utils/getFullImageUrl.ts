export function getFullImageUrl(path: string | null | undefined): string {
	if (!path) return ''

	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}

	const baseUrl =
		process.env.NEXT_PUBLIC_API_STATIC_URL || 'http://localhost:3000'

	return `${baseUrl.replace(/\/$/, '')}${path}`
}
