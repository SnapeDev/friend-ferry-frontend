/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rjdgxglagqjbpgfirdlb.supabase.co",
			},
		],
	},

	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack: (config) => {
		config.resolve.alias["handlebars"] = "handlebars/dist/handlebars.min.js";
		return config;
	},
};

export default nextConfig;
