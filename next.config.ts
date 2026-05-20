import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',

		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/uploads/**',
			},
		],
	},
}

export default nextConfig
