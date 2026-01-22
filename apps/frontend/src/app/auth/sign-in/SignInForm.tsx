"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./schemas";
import { Input, Button } from "@shared/ui/components";
import Link from "next/link";
import { useTransition } from "react";
import { PasswordInput } from "../_components";
import { signin } from "./actions";
import toast from "react-hot-toast";

export function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignInSchema),
	});
	const [isPending, startTransition] = useTransition();

	const onSubmit = (data: SignInSchema) => {
		startTransition(async () => {
			const { ok, message } = await signin(data);
			if (!ok) {
				toast.error(message || "Sign in failed");
			} else {
				toast.success("Sign in successful! Redirecting...");
				window.location.href = "/";
			}
		});
	};

	return (
		<div className="animate-fade-in">
			<div className="mb-6 text-center">
				<h1 className="text-2xl font-bold text-navy-deep dark:text-cream">
					Welcome back
				</h1>
				<p className="mt-1 text-sm text-navy/60 dark:text-cream/50">
					Sign in to continue to Holy Grail
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

				<div className="pt-2">
					<Button
						type="submit"
						className="w-full bg-amber text-navy-deep hover:bg-amber-light"
						disabled={isPending}
					>
						{isPending ? "Signing in..." : "Sign In"}
					</Button>
				</div>
			</form>

			<div className="mt-6 space-y-2 text-center text-sm">
				<p className="text-navy/60 dark:text-cream/50">
					Forgot your password?{" "}
					<Link
						href="/auth/forgot-password"
						className="font-medium text-amber hover:underline"
					>
						Reset it
					</Link>
				</p>
				<p className="text-navy/60 dark:text-cream/50">
					Don't have an account?{" "}
					<Link
						href="/auth/register"
						className="font-medium text-amber hover:underline"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
