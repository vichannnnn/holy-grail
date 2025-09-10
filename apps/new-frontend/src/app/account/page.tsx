import { getUser, RoleEnum } from "@lib/auth";
import { unauthorized } from "next/navigation";
import { Title, Text, Divider, Input, Button } from "@shared/ui/components";
import { AccountSection } from "./_components";
import {
	UserIcon,
	EnvelopeIcon,
	LockClosedIcon,
	ExclamationCircleIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PasswordInput } from "@/app/auth/_components/PasswordInput";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
export default async function AccountPage() {
	const user = await getUser();
	if (!user) {
		unauthorized();
	}

	return (
		<main className="flex flex-col items-center mx-auto lg:w-2/3 w-11/12">
			<div className="flex flex-col items-center gap-2 mb-8">
				<Title order={1} className="font-bold text-center text-2xl">
					Account Settings
				</Title>
				<Text>View and manage your account details here.</Text>
			</div>
			<Divider className="w-full" />
			<div className="flex flex-col gap-12 my-6 w-full">
				<AccountSection
					title="Account Information"
					icon={<UserIcon className="size-6" />}
					className="flex flex-col gap-4"
				>
					<div className="flex sm:flex-row flex-col gap-3 justify-between sm:items-center">
						<div className="flex flex-col gap-0.5">
							<Text className="font-semibold text-lg">Username</Text>
							<Text description className="text-sm md:text-xs">
								Your username cannot be changed once created. Sorry!
							</Text>
						</div>
						<Text>{user.username}</Text>
					</div>
					<div className="flex sm:flex-row flex-col gap-3 justify-between sm:items-center">
						<Text className="font-semibold text-lg">Role</Text>
						<Text className="capitalize">{RoleEnum[user.role].toLowerCase()}</Text>
					</div>
					<div className="flex sm:flex-row flex-col gap-3 justify-between sm:items-center">
						<div className="flex flex-col gap-0.5">
							<Text className="font-semibold text-lg">Account verification status</Text>
							<Text description className="text-sm md:text-xs">
								{user.verified ? (
									"Verified accounts can upload notes to our repository :)"
								) : (
									<>
										Please click{" "}
										<span className="text-blue-500 font-semibold cursor-pointer">here</span> to
										resend the verification email.
									</>
								)}
							</Text>
						</div>
						<Text className="text-green-600 dark:text-green-500 flex items-center gap-1">
							{user.verified ? (
								<>
									<CheckCircleIcon className="size-5" />
									Verified
								</>
							) : (
								<>
									<ExclamationCircleIcon className="size-5" />
									Not verified
								</>
							)}
						</Text>
					</div>
				</AccountSection>
				<AccountSection
					title="Update email address"
					icon={<EnvelopeIcon className="size-6" />}
					className="flex flex-col gap-4"
				>
					<Text>
						{user.email ? (
							<>
								Your current email address is <span className="font-semibold">{user.email}</span>.
							</>
						) : (
							"You have not set an email address yet."
						)}
					</Text>
					<div className="flex flex-col sm:flex-row gap-2 justify-between">
						<Input
							label="New email address"
							placeholder="joe.mom@email.com"
							containerClassName="grow"
						/>
						<Button className="grow-0 mt-2 sm:mt-auto mx-auto">Update</Button>
					</div>
				</AccountSection>
				<AccountSection
					title="Change password"
					icon={<LockClosedIcon className="size-6" />}
					className="flex flex-col gap-4"
				>
					<Text>Enter your current password and the new password you want to change to.</Text>
					<div className="flex flex-col gap-2 justify-between">
						<PasswordInput
							label="Old password"
							placeholder="joe.mom@email.com"
							containerClassName="grow"
						/>
						<PasswordInput
							label="New password"
							placeholder="joe.mom@email.com"
							containerClassName="grow"
						/>
						<PasswordInput
							label="Repeat new password"
							placeholder="joe.mom@email.com"
							containerClassName="grow"
						/>
					</div>
					<Button className="grow-0 mx-auto">Update password</Button>
				</AccountSection>
			</div>
		</main>
	);
}
