import { ForgotPasswordForm } from "./ForgotPasswordForm";
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

export default function ForgotPasswordPage() {
	return <ForgotPasswordForm />;
}
