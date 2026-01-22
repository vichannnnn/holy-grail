"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schemas";
import { Input, Button } from "@shared/ui/components";
import Link from "next/link";
import { useTransition } from "react";
import { PasswordInput } from "../_components";
import { register as registerUser } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function RegisterForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(RegisterSchema),
	});
	const [isPending, startTransition] = useTransition();

	const onSubmit = (data: RegisterSchema) => {
		startTransition(async () => {
			const { ok, message } = await registerUser(data);
			if (!ok) {
				toast.error(message || "Registering failed");
			} else {
				toast.success("Registering successful! Redirecting...");
				router.push("/library");
			}
		});
	};

	return (
		<div className="animate-fade-in">
			<div className="mb-6 text-center">
				<h1 className="text-2xl font-bold text-navy-deep dark:text-cream">
					Join the community
				</h1>
				<p className="mt-1 text-sm text-navy/60 dark:text-cream/50">
					Create an account to contribute notes
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					label="Username"
					{...register("username")}
					error={errors.username?.message as string}
					required
				/>
				<Input
					label="Email"
					{...register("email")}
					error={errors.email?.message as string}
					required
				/>

				<PasswordInput
					label="Password"
					{...register("password")}
					error={errors.password?.message as string}
					required
				/>
				<PasswordInput
					label="Repeat Password"
					{...register("repeat_password")}
					error={errors.repeat_password?.message as string}
					required
				/>

				<p className="text-xs text-navy/50 dark:text-cream/40">
					By creating an account, you agree to our{" "}
					<Link href="/privacy" className="text-amber hover:underline">
						Privacy Policy
					</Link>{" "}
					and{" "}
					<Link href="/terms-of-service" className="text-amber hover:underline">
						Terms of Service
					</Link>
					.
				</p>

				<div className="pt-2">
					<Button
						type="submit"
						className="w-full bg-amber text-navy-deep hover:bg-amber-light"
						disabled={isPending}
					>
						{isPending ? "Creating account..." : "Create Account"}
					</Button>
				</div>
			</form>

			<div className="mt-6 text-center text-sm">
				<p className="text-navy/60 dark:text-cream/50">
					Already have an account?{" "}
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
