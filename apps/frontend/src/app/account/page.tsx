import { getUser, RoleEnum } from "@lib/auth";
import { unauthorized } from "next/navigation";
import { Card } from "@shared/ui/components";
import {
	AccountSection,
	ResendVerifyEmail,
	UpdateEmailForm,
	UpdatePasswordForm,
} from "./_components";
import {
	UserIcon,
	EnvelopeIcon,
	LockClosedIcon,
	ExclamationCircleIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";
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
		<section className="relative overflow-hidden py-12">
			<div className="absolute -left-40 top-20 size-80 rounded-full bg-amber/5 blur-3xl dark:bg-amber/3" />
			<div className="absolute -right-40 bottom-20 size-80 rounded-full bg-coral/5 blur-3xl dark:bg-coral/3" />

			<div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 text-center animate-fade-in-up">
					<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber">
						Your Profile
					</p>
					<h1 className="mb-3 text-3xl font-bold text-navy-deep dark:text-cream">
						Account Settings
					</h1>
					<p className="text-navy/60 dark:text-cream/50">
						View and manage your account details here.
					</p>
				</div>

				<div className="space-y-8 animate-fade-in-up [animation-delay:100ms]">
					<AccountSection
						title="Account Information"
						icon={<UserIcon className="size-5" />}
					>
						<div className="space-y-5">
							<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="font-medium text-navy-deep dark:text-cream">Username</p>
									<p className="text-xs text-navy/50 dark:text-cream/40">
										Your username cannot be changed once created.
									</p>
								</div>
								<p className="mt-1 font-mono text-navy/80 dark:text-cream/70 sm:mt-0">
									{user.username}
								</p>
							</div>

							<div className="border-t border-navy/5 dark:border-cream/5" />

							<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<p className="font-medium text-navy-deep dark:text-cream">Role</p>
								<span className="inline-flex items-center rounded-full bg-amber/10 px-3 py-1 text-xs font-medium capitalize text-amber dark:bg-amber/20">
									{RoleEnum[user.role].toLowerCase()}
								</span>
							</div>

							<div className="border-t border-navy/5 dark:border-cream/5" />

							<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="font-medium text-navy-deep dark:text-cream">
										Verification Status
									</p>
									<p className="text-xs text-navy/50 dark:text-cream/40">
										{user.verified ? (
											"Verified accounts can upload notes to our repository :)"
										) : (
											<>
												Click <ResendVerifyEmail>here</ResendVerifyEmail> to resend the
												verification email.
											</>
										)}
									</p>
								</div>
								{user.verified ? (
									<span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 sm:mt-0">
										<CheckCircleIcon className="size-4" />
										Verified
									</span>
								) : (
									<span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-coral dark:text-coral-soft sm:mt-0">
										<ExclamationCircleIcon className="size-4" />
										Not verified
									</span>
								)}
							</div>
						</div>
					</AccountSection>

					<AccountSection
						title="Update Email Address"
						icon={<EnvelopeIcon className="size-5" />}
					>
						<div className="space-y-4">
							<p className="text-sm text-navy/70 dark:text-cream/60">
								{user.email ? (
									<>
										Your current email address is{" "}
										<span className="font-medium text-navy-deep dark:text-cream">
											{user.email}
										</span>
										.
									</>
								) : (
									"You have not set an email address yet."
								)}
							</p>
							<UpdateEmailForm />
						</div>
					</AccountSection>

					<AccountSection
						title="Change Password"
						icon={<LockClosedIcon className="size-5" />}
					>
						<div className="space-y-4">
							<p className="text-sm text-navy/70 dark:text-cream/60">
								Enter your current password and the new password you want to change to.
							</p>
							<UpdatePasswordForm />
						</div>
					</AccountSection>
				</div>
			</div>
		</section>
	);
}
