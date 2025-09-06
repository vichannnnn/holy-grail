import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { UpdatePasswordDetails as UpdatePasswordRequest, updatePassword } from "@api/auth";

import { TextField } from "@components/TextField";

import { AuthContext } from "@providers/AuthProvider";

import { UpdatePasswordValidation } from "@utils/forms";

import { FormProps } from "@forms/types";

export const UpdatePassword = ({ onSubmitSuccess, onSubmitFailure, formId }: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdatePasswordRequest>({ resolver: yupResolver(UpdatePasswordValidation) });

	const { fetchUser } = useContext(AuthContext);

	const handleUpdatePassword = async (formData: UpdatePasswordRequest) => {
		try {
			onSubmitFailure(null);
			await updatePassword(formData);
			fetchUser();
			onSubmitSuccess();
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.status === 422) {
				onSubmitFailure("Password has to be between 8 to 30 characters.");
			} else if (axiosError.response && axiosError.response.status === 400) {
				onSubmitFailure(
					"You have entered an incorrect password. Please check your password and try again.",
				);
			}
		}
	};

	return (
		<form id={formId} onSubmit={handleSubmit(handleUpdatePassword)}>
			<Stack direction="column" spacing={2}>
				<FormControl id="before_password" className="flex flex-row gap-4 items-center">
					<TextField
						type="password"
						label="Current Password"
						error={Boolean(errors.before_password)}
						helperText={errors.before_password?.message}
						{...register("before_password")}
						required
					/>
				</FormControl>
				<FormControl id="new_password" className="flex flex-row gap-4 items-center">
					<TextField
						type="password"
						label="New Password"
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
						{...register("password")}
						required
					/>
				</FormControl>
				<FormControl id="repeat_password" className="flex flex-row gap-4 items-center">
					<TextField
						type="password"
						label="Repeat Password"
						error={Boolean(errors.repeat_password)}
						helperText={errors.repeat_password?.message}
						{...register("repeat_password")}
						required
					/>
				</FormControl>
			</Stack>
		</form>
	);
};
