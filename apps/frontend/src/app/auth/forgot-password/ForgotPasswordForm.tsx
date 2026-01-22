"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, type ForgotPasswordFormData } from "./schemas";
import { Input, Button } from "@shared/ui/components";
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
		<div className="animate-fade-in">
			<div className="mb-6 text-center">
				<h1 className="text-2xl font-bold text-navy-deep dark:text-cream">
					Reset your password
				</h1>
				<p className="mt-1 text-sm text-navy/60 dark:text-cream/50">
					Enter your email and we'll send you a reset link
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Email"
					{...register("email")}
					error={errors.email?.message as string}
					required
				/>

				<div className="pt-2">
					<Button
						type="submit"
						className="w-full bg-amber text-navy-deep hover:bg-amber-light"
						disabled={isPending}
					>
						{isPending ? "Sending..." : "Send Reset Link"}
					</Button>
				</div>
			</form>

			<div className="mt-6 text-center text-sm">
				<p className="text-navy/60 dark:text-cream/50">
					Remember your password?{" "}
					<Link
						href="/auth/sign-in"
						className="font-medium text-amber hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
