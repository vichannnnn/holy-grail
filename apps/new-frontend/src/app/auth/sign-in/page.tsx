import type { Metadata } from "next";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
	title: "Sign In - Holy Grail",
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

export default function SignInPage() {
	return <SignInForm />;
}
