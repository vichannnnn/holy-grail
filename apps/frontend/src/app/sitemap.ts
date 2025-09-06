import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date();

	return [
		{
			url: "https://grail.moe",
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://grail.moe/faq",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://grail.moe/upload",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://grail.moe/library",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://grail.moe/privacy",
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: "https://grail.moe/terms-of-service",
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: "https://grail.moe/login",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://grail.moe/register",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://grail.moe/forgot-password",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://grail.moe/reset-password",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: "https://grail.moe/settings/account",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: "https://grail.moe/verify",
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
	];
}
