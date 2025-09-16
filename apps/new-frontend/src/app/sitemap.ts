import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import * as path from "path";

interface RouteConfig {
	priority: number;
	changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

// Configuration overrides for specific routes
const routeConfigs: Record<string, RouteConfig> = {
	"/": { priority: 1.0, changeFrequency: "weekly" },
	"/library": { priority: 0.9, changeFrequency: "daily" },
	"/upload": { priority: 0.8, changeFrequency: "weekly" },
	"/faq": { priority: 0.6, changeFrequency: "monthly" },
	"/account": { priority: 0.8, changeFrequency: "weekly" },
	"/auth/sign-in": { priority: 0.7, changeFrequency: "monthly" },
	"/auth/register": { priority: 0.7, changeFrequency: "monthly" },
	"/leaderboard": { priority: 0.7, changeFrequency: "daily" },
	"/privacy": { priority: 0.6, changeFrequency: "yearly" },
	"/terms-of-service": { priority: 0.6, changeFrequency: "yearly" },
	"/verify-account": { priority: 0.6, changeFrequency: "monthly" },
	"/auth/forgot-password": { priority: 0.5, changeFrequency: "monthly" },
	"/reset-password": { priority: 0.5, changeFrequency: "monthly" },
	"/developer": { priority: 0.5, changeFrequency: "monthly" },
	"/admin": { priority: 0.4, changeFrequency: "weekly" },
};

// Default configuration for routes not explicitly configured
const defaultConfig: RouteConfig = {
	priority: 0.6,
	changeFrequency: "monthly",
};

function getAllRoutes(): string[] {
	const routes: string[] = [];
	const appDir = path.join(process.cwd(), "src", "app");

	function scanDirectory(dirPath: string, routePath = ""): void {
		try {
			const entries = readdirSync(dirPath, { withFileTypes: true });

			// Check if current directory has a page.tsx file
			const hasPage = entries.some((entry) => !entry.isDirectory() && entry.name === "page.tsx");

			if (hasPage) {
				routes.push(routePath || "/");
			}

			// Recursively scan subdirectories
			for (const entry of entries) {
				if (entry.isDirectory() && !entry.name.startsWith("_") && !entry.name.startsWith("(")) {
					const newRoutePath = routePath + "/" + entry.name;
					scanDirectory(path.join(dirPath, entry.name), newRoutePath);
				}
			}
		} catch (error) {
			console.warn(`Failed to scan directory ${dirPath}:`, error);
		}
	}

	scanDirectory(appDir);
	return routes.sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://grail.moe";
	const currentDate = new Date();

	const routes = getAllRoutes();

	return routes.map((route) => {
		const config = routeConfigs[route] || defaultConfig;

		return {
			url: `${baseUrl}${route}`,
			lastModified: currentDate,
			changeFrequency: config.changeFrequency,
			priority: config.priority,
		};
	});
}
