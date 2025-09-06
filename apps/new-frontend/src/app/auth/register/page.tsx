import { RegisterForm } from "./RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
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

export default function RegisterPage() {
	return <RegisterForm />;
}
