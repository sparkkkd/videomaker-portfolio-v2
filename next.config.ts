import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',

		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.dmitrikuzmin.ru',
				pathname: '/uploads/**',
			},
		],
	},
}

export default nextConfig
