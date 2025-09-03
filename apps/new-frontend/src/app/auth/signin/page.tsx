"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./schemas";
import { Input, Title, Text, Button } from "@shared/ui/components";
import Link from "next/link";
import { useTransition } from "react";
import { PasswordInput } from "../_components";
import type { Metadata } from "next";

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

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignInSchema),
	});
	const [isPending, startTransition] = useTransition();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col items-center xl:w-1/2 md:w-2/3 w-1/2">
			<Title order={1} className="text-2xl">
				Sign in to your account
			</Title>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 flex flex-col gap-4">
				<Input
					label="Username"
					{...register("username")}
					error={errors.username?.message as string}
					required
				/>

				<PasswordInput
					label="Password"
					{...register("password")}
					error={errors.password?.message as string}
					required
				/>
				<div className="mt-2">
					{isPending ? (
						<Button type="submit" className="w-full" disabled>
							Signing In...
						</Button>
					) : (
						<Button type="submit" className="w-full">
							Sign In
						</Button>
					)}
				</div>
			</form>
			<Text description className="mt-4 text-sm">
				Forgot your password? Click{" "}
				<Link href="/auth/forgot-password" className="font-bold">
					here
				</Link>
				.
			</Text>
			<Text description className="mt-4 text-sm">
				Don't have an account yet? Register{" "}
				<Link href="/auth/register" className="font-bold">
					here
				</Link>
				.
			</Text>
		</div>
	);
}
