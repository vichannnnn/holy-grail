import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
	output: "standalone",
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

if (process.env.NODE_ENV === "development") {
	nextConfig.outputFileTracingRoot = join(__dirname, "../../");
}

export default nextConfig;
