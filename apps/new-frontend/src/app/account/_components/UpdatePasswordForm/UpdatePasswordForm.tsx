"use client";
import { useForm } from "react-hook-form";
import { Button } from "@shared/ui/components";
import { PasswordInput } from "@/app/auth/_components/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UpdatePasswordFormData, updatePasswordFormSchema } from "./schemas";
import { updatePassword } from "./actions";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { flushSync } from "react-dom";

export function UpdatePasswordForm() {
	const [isPending, startTransition] = useTransition();
	const [formKey, setFormKey] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdatePasswordFormData>({
		resolver: zodResolver(updatePasswordFormSchema),
		defaultValues: {
			before_password: "",
			password: "",
			repeat_password: "",
		},
	});

	const onSubmit = (data: UpdatePasswordFormData) => {
		startTransition(async () => {
			try {
				const result = await updatePassword(data);

				if (result.ok) {
					toast.success(result.message);
					// hack: remount to fully reset form
					reset();
					setFormKey((prev) => prev + 1);
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				toast.error("An unexpected error occurred. Please try again later.");
			}
		});
	};
	return (
		<form key={formKey} className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-2 justify-between">
				<PasswordInput
					label="Old password"
					placeholder="eg. iloveEc0ns/"
					containerClassName="grow"
					{...register("before_password")}
					error={errors.before_password?.message as string}
					required
				/>
				<PasswordInput
					label="New password"
					placeholder="eg. ihateEc0ns/"
					containerClassName="grow"
					{...register("password")}
					error={errors.password?.message as string}
					required
				/>
				<PasswordInput
					label="Repeat new password"
					placeholder="eg. ihateEc0ns/"
					containerClassName="grow"
					{...register("repeat_password")}
					error={errors.repeat_password?.message as string}
					required
				/>
			</div>
			<Button className="grow-0 mx-auto" type="submit" disabled={isPending}>
				{isPending ? "Updating..." : "Update password"}
			</Button>
		</form>
	);
}
