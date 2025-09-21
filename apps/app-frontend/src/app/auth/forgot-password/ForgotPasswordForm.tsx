"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, type ForgotPasswordFormData } from "./schemas";
import { Input, Title, Text, Button } from "@shared/ui/components";
import Link from "next/link";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { sendResetPasswordEmail } from "./actions";

export function ForgotPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ForgotPasswordSchema),
	});
	const [isPending, startTransition] = useTransition();

	const onSubmit = (data: ForgotPasswordFormData) => {
		startTransition(async () => {
			const result = await sendResetPasswordEmail(data);
			if (result.ok) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		});
	};

	return (
		<div className="flex flex-col items-center xl:w-1/2 md:w-2/3 w-1/2">
			<Title order={1} className="text-2xl">
				Forgot your password?
			</Title>
			<Text description className="mt-4 text-sm">
				Please enter the email you registered the account with to reset your password.
			</Text>

			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 flex flex-col gap-4">
				<Input
					label="Email"
					{...register("email")}
					error={errors.email?.message as string}
					required
				/>
				<div className="mt-2">
					{isPending ? (
						<Button type="submit" className="w-full" disabled>
							Resetting
						</Button>
					) : (
						<Button type="submit" className="w-full">
							Reset Password
						</Button>
					)}
				</div>
			</form>
			<Text description className="mt-4 text-sm">
				Remembered your password? Sign in{" "}
				<Link href="/auth/sign-in" className="font-bold">
					here
				</Link>
				.
			</Text>
		</div>
	);
}
