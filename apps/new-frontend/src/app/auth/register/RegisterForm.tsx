"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./schemas";
import { Input, Title, Text, Button } from "@shared/ui/components";
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
		<div className="flex flex-col items-center xl:w-1/2 md:w-2/3 w-1/2">
			<Title order={1} className="text-2xl">
				Register a new account
			</Title>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6 flex flex-col gap-4">
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
				<Text description className="text-xs">
					By creating an account, you confirm that you have read and agree to our{" "}
					<Link href="/privacy" className="font-bold">
						Privacy Policy
					</Link>{" "}
					and{" "}
					<Link href="/terms-of-service" className="font-bold">
						Terms of Service
					</Link>
					, including how we collect, use, and share your data.
				</Text>
				<div className="mt-2">
					{isPending ? (
						<Button type="submit" className="w-full" disabled>
							Registering...
						</Button>
					) : (
						<Button type="submit" className="w-full">
							Register
						</Button>
					)}
				</div>
			</form>
			<Text description className="mt-4 text-sm">
				Already have an account? Sign in{" "}
				<Link href="/auth/signin" className="font-bold">
					here
				</Link>
				.
			</Text>
		</div>
	);
}
