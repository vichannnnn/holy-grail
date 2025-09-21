"use client";
import { Modal, Text, Combobox, Button } from "@shared/ui/components";
import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EditUserSchema, ROLE_OPTIONS, type EditUserFormData } from "./schemas";
import type { UserEditProps } from "./types";
import { updateUserRole } from "../actions";

export function UserEdit({ render, user }: Readonly<UserEditProps>) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const { control, handleSubmit } = useForm<EditUserFormData>({
		resolver: zodResolver(EditUserSchema),
		defaultValues: {
			role: user.role,
		},
	});

	const toggleOpen = () => setIsOpen((prev) => !prev);

	const onSubmit = async (formData: EditUserFormData) => {
		startTransition(async () => {
			try {
				const result = await updateUserRole(user.user_id, { role: formData.role });

				if (!result.ok) {
					toast.error(result.err || "An error occurred");
					return;
				}

				toast.success("User role updated successfully");
				setIsOpen(false);
				router.refresh();
			} catch {
				toast.error("Failed to update user role");
			}
		});
	};

	return (
		<>
			{render({ toggleOpen })}
			<Modal open={isOpen} onClose={() => setIsOpen(false)} className="p-6 max-w-md">
				<div className="space-y-6">
					<div>
						<Text className="text-xl font-semibold mb-2">Edit User</Text>
						<Text className="text-sm text-gray-600 dark:text-gray-400">
							Update the user role below.
						</Text>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Controller
							name="role"
							control={control}
							render={({ field, fieldState: { error } }) => {
								const selectedRole = ROLE_OPTIONS.find((role) => role.id === field.value);
								return (
									<Combobox
										label="Role"
										placeholder="Select a role"
										items={ROLE_OPTIONS}
										defaultValue={selectedRole}
										onValueChange={(newValue) => {
											field.onChange(newValue?.id ?? 1);
										}}
										containerClassName="w-full"
										error={error?.message}
									/>
								);
							}}
						/>

						<div className="flex justify-end gap-3 pt-4">
							<Button
								type="button"
								variant="ghost"
								onClick={() => setIsOpen(false)}
								disabled={isPending}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isPending}>
								{isPending ? "Updating..." : "Update User"}
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
}
