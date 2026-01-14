"use client";
import { useForm } from "react-hook-form";
import { Input, Button } from "@shared/ui/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UpdateEmailFormData, updateEmailFormSchema } from "./schemas";
import { twMerge } from "tailwind-merge";
import { updateEmail } from "./actions";
import { toast } from "react-hot-toast";
import { useTransition, useState } from "react";
export function UpdateEmailForm() {
	const [isPending, startTransition] = useTransition();
	const [formKey, setFormKey] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateEmailFormData>({
		resolver: zodResolver(updateEmailFormSchema),
		defaultValues: {
			new_email: "",
		},
	});

	const onSubmit = (data: UpdateEmailFormData) => {
		startTransition(async () => {
			try {
				const { ok, message } = await updateEmail(data);
				if (ok) {
					toast.success(message);

					// hack: remount to fully reset form
					reset();
					setFormKey((prev) => prev + 1);
				} else {
					toast.error(message);
				}
			} catch {
				toast.error("An unexpected error occurred. Please try again later.");
			}
		});
	};

	return (
		<form
			key={formKey}
			className="flex flex-col sm:flex-row gap-2 justify-between"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label="New email address"
				placeholder="eg. joe.mom@email.com"
				containerClassName="grow"
				{...register("new_email")}
				error={errors.new_email?.message as string}
				required
			/>
			<Button
				className={twMerge("grow-0 mt-2 sm:mt-auto mx-auto", errors.new_email ? "sm:mb-5" : "")}
				type="submit"
				disabled={isPending}
			>
				{isPending ? "Updating..." : "Update"}
			</Button>
		</form>
	);
}
