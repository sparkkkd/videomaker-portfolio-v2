import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				// Теперь font-sans будет использовать Inter Tight
				sans: ['var(--font-inter-tight)', 'sans-serif'],
			},
			spacing: {
				'25': '25px', // Твой кастомный токен из прошлого шага
			},
		},
	},
	plugins: [],
}

export default config
