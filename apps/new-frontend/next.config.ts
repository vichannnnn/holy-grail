import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		authInterrupts: true,
		optimizePackageImports: ["@shared/ui", "@lib"],
		serverActions: {
			bodySizeLimit: "13gb", // 500mb * 25 files + buffer (500mb)
		},
	},
};

export default nextConfig;
