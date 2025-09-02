import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		optimizePackageImports: ["@shared/ui", "@lib"],
	},
};

export default nextConfig;
