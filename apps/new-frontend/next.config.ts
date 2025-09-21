import type { NextConfig } from "next";
import analyze from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		authInterrupts: true,
		optimizePackageImports: [
			"@shared/ui",
			"@lib",
			"zod",
			"axios",
			"tailwind-merge",
			"react-hook-form",
			"@hookform/resolvers",
		],
		serverActions: {
			bodySizeLimit: "13gb", // 500mb * 25 files + buffer (500mb)
		},
		cssChunking: true,
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
	output: "standalone",
};

export default analyze({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);
