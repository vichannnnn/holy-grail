export async function generateDefaultMetadata() {
	return {
		title: "Holy Grail",
		description: "Holy Grail - The platform for educational resources and community learning.",
		openGraph: {
			title: "Holy Grail",
			description:
				"Join Holy Grail to discover and share educational resources in our collaborative learning platform.",
			images: [
				{
					url: "",
				},
			],
			siteName: "Holy Grail",
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: "Holy Grail",
			description:
				"Join Holy Grail to discover and share educational resources in our collaborative learning platform.",
			images: ["/images/twitter-card.jpg"],
		},
		icons: {
			icon: "/favicon.ico",
			apple: "/apple-icon.png",
		},
		metadataBase: new URL("https://grail.moe"),
		robots: {
			index: true,
			follow: true,
		},
	};
}

export async function generateAdminPanelMetadata() {
	return {
		title: "Administrator Panel - Holy Grail",
	};
}

export async function generateDeveloperPanelMetadata() {
	return {
		title: "Developer Panel - Holy Grail",
	};
}

export async function generateFAQMetadata() {
	return {
		title: "FAQ - Holy Grail",
		description:
			"Get answers to frequently asked questions about Holy Grail. Find information about our services, account management, and more.",
		openGraph: {
			title: "Frequently Asked Questions | Holy Grail",
			description:
				"Find quick answers to common questions about Holy Grail. Our comprehensive FAQ covers account setup, features, and everything you need to get started.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generatePrivacyPolicyMetadata() {
	return {
		title: "Privacy Policy - Holy Grail",
		description:
			"Learn how Holy Grail collects, uses, and protects your personal information. Our Privacy Policy explains the data we collect, how we use it.",
		openGraph: {
			title: "Privacy Policy - Holy Grail",
			description:
				"Holy Grail respects your privacy. Read our Privacy Policy to understand how we collect, use, and share personal data on our platform.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateAccountSettingsMetadata() {
	return {
		title: "Account Settings - Holy Grail",
		description:
			"Manage your account settings on Holy Grail. Update personal details and settings to keep your account secure and up-to-date.",
		openGraph: {
			title: "Account Settings - Holy Grail",
			description:
				"Modify your personal details and settings to enhance your experience on Holy Grail.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateTermsOfServiceMetadata() {
	return {
		title: "Terms of Service - Holy Grail",
		description:
			"Review the Terms of Service for Holy Grail. Learn about the terms for using the platform, including account creation and user responsibilities.",
		openGraph: {
			title: "Terms of Service - Holy Grail",
			description:
				"Understand the terms for using Holy Grail. Read about your rights and obligations, and how to use the platform responsibly.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateVerifyAccountMetadata() {
	return {
		title: "Verify Your Account - Holy Grail",
		description: "Verify your account on Holy Grail.",
		openGraph: {
			title: "Account Verification - Holy Grail",
			description:
				"Complete your account verification on Holy Grail to explore. Verify your email and unlock access to our platform.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateForgotPasswordMetadata() {
	return {
		title: "Forgot Password - Holy Grail",
		description:
			"Reset your Holy Grail account password. Quick and secure password recovery process to help you regain access to your account.",
		openGraph: {
			title: "Recover Your Password | Holy Grail",
			description:
				"Forgot your password? No problem. Use our secure password recovery system to reset your Holy Grail account and get back to your resources quickly.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateLeaderboardMetadata() {
	return {
		title: "Leaderboard - Holy Grail",
		description:
			"Explore the Holy Grail leaderboard to see top contributors and rankings. Track your progress and compare with" +
			" others in the community.",
		openGraph: {
			title: "Community Leaderboard | Holy Grail",
			description:
				"Check out Holy Grail\'s leaderboard to discover top contributors and track your own progress. See how you" +
				" compare with others and celebrate community achievements.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateLibraryMetadata() {
	return {
		title: "Library - Holy Grail",
		description:
			"Browse Holy Grail's comprehensive resource library. Access educational materials, guides, and resources organized by category and subject.",
		openGraph: {
			title: "Resource Library | Holy Grail",
			description:
				"Discover a wealth of knowledge in Holy Grail's library. Find curated educational resources, learning materials, and guides to enhance your experience.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateLoginMetadata() {
	return {
		title: "Login - Holy Grail",
		description: "Sign in to your Holy Grail account.",
		openGraph: {
			title: "Sign In to Your Account | Holy Grail",
			description:
				"Log in to Holy Grail to access your personalized experience. Manage your resources, track your progress, and connect with our community.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateRegisterMetadata() {
	return {
		title: "Register - Holy Grail",
		description:
			"Create your Holy Grail account. Join our community to access resources, track your progress, and personalize your experience.",
		openGraph: {
			title: "Create an Account | Holy Grail",
			description:
				"Sign up for Holy Grail to unlock full access to our platform. Join thousands of users and start your journey with personalized features and resources.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateResetPasswordMetadata() {
	return {
		title: "Reset Password - Holy Grail",
		description:
			"Create a new password for your Holy Grail account. Complete your secure password reset process to regain access.",
		openGraph: {
			title: "Set Your New Password | Holy Grail",
			description:
				"Finalize your password reset for Holy Grail. Create a strong, new password to secure your account and quickly return to using our platform.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateUploadMetadata() {
	return {
		title: "Upload - Holy Grail",
		description:
			"Upload and share resources to the Holy Grail library. Contribute to our growing collection of educational materials and tools.",
		openGraph: {
			title: "Contribute Resources | Holy Grail",
			description:
				"Share your knowledge with the Holy Grail community. Upload educational resources, documents, and materials to help others and enhance our collaborative platform.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}

export async function generateNotFoundMetadata() {
	return {
		title: "Page Not Found - Holy Grail",
		description:
			"The page you are looking for could not be found. Please check the URL or return to the homepage of Holy Grail.",
		openGraph: {
			title: "404 - Page Not Found",
			description:
				"Oops! The page you are looking for does not exist. Return to the Holy Grail homepage.",
			images: [
				{
					url: "",
				},
			],
		},
	};
}
