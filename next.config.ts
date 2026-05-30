import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	transpilePackages: ['next-auth'],

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
