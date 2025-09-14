import { verifyAccount } from "./actions";
import { Button, Text, Title } from "@shared/ui/components";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ResendVerifyButton } from "./_components";
import Link from "next/link";

export default async function VerifyAccountPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
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
						No verification token was provided. Please check your verification link.
					</Text>
					<Button className="mt-6">
						<Link href="/">Go Home</Link>
					</Button>
				</div>
			</main>
		);
	}
	const { ok } = await verifyAccount(token);

	if (ok) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
					<Title order={1} className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						Account Verified
					</Title>
					<Text className="mt-4 text-base leading-7 text-gray-600">
						Your account has been successfully verified. You can now upload notes!
					</Text>
					<Button className="mt-6">
						<Link href="/">Go Home</Link>
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
					Verification Link Invalid or Expired
				</Title>
				<Text className="mt-4 text-base leading-7 text-gray-600">
					Your verification link is invalid or has expired. Please request a new verification email.
				</Text>
				<div className="mt-6 flex items-center justify-center gap-x-6">
					<ResendVerifyButton />
				</div>
			</div>
		</main>
	);
}
