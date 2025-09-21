import { resetPassword } from "./actions";
import { Button, Text, Title } from "@shared/ui/components";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
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

export default async function ResetPasswordPage({
	searchParams,
}: Readonly<{
	searchParams: Promise<{ token?: string }>;
}>) {
	const token = (await searchParams).token;
	if (!token) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600" />
					<Title order={1} className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						No Token Provided
					</Title>
					<Text className="mt-4 text-base leading-7 text-gray-600">
						No reset password token was provided. Please check your reset password link.
					</Text>
					<Button className="mt-6">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</main>
		);
	}
	const { ok } = await resetPassword(token);

	if (ok) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
					<Title order={1} className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						Password Reset Successful
					</Title>
					<Text className="mt-4 text-base leading-7 text-gray-600">
						Your password has been successfully reset. Check your email for further instructions.
					</Text>
					<Button className="mt-6">
						<Link href="/auth/sign-in">Sign In</Link>
					</Button>
				</div>
			</main>
		);
	}
	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600" />
				<Title order={1} className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
					Reset Password Link Invalid or Expired
				</Title>
				<Text className="mt-4 text-base leading-7 text-gray-600">
					Your reset password link is invalid or has expired. Please request a new reset password
					email.
				</Text>
				<div className="mt-6 flex items-center justify-center gap-x-6">
					<Button>
						<Link href="/auth/forgot-password">Request New Reset Link</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
