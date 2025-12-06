"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./schemas";
import { Input, Title, Text, Button } from "@shared/ui/components";
import Link from "next/link";
import { useTransition } from "react";
import { PasswordInput } from "../_components";
import { signin } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

/**
 * Render a sign-in form that validates input, displays field errors and loading state, and handles sign-in results.
 *
 * The form shows validation messages for username and password, disables the submit button while signing in, and
 * displays toast notifications on failure or success. On failure it will:
 * - show a friendly "invalid username or password" message if the server message contains "422",
 * - show the server-provided message if present and not "422",
 * - otherwise show a generic "Sign in failed" message.
 * On success it shows a success toast and navigates to the application root ("/").
 *
 * @returns A JSX element containing the sign-in form.
 */
export function SignInForm() {
	const router = useRouter();
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
                if (message){
                    if (message.includes("422")){
                        toast.error("You have entered an invalid username or password. Please try again.");
                    }
                    else{
                        toast.error(message);
                    }
                }
                else{
                    toast.error("Sign in failed");
                }
			} else {
				toast.success("Sign in successful! Redirecting...");
				router.push("/");
			}
		});
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