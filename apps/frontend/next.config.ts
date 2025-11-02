import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	// cacheComponents: true,
	experimental: {
		authInterrupts: true,
		optimizePackageImports: ["@shared/ui", "@lib"],
		serverActions: {
			bodySizeLimit: "13gb", // 500mb * 25 files + buffer (500mb)
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.himaa.me",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
