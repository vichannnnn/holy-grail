import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { ForgotPasswordDetails, sendResetPasswordEmail } from "@api/auth";

import { TextField } from "@components/TextField";

import { ForgotPasswordValidation } from "@utils/forms";

import { FormProps } from "@forms/types";

export const ForgotPasswordForm = ({ onSubmitSuccess, onSubmitFailure, formId }: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordDetails>({
		resolver: yupResolver(ForgotPasswordValidation),
	});

	const handleSubmitResetPassword = async (formData: ForgotPasswordDetails) => {
		try {
			onSubmitFailure(null);
			await sendResetPasswordEmail(formData);
			onSubmitSuccess();
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred during the operation.";
			onSubmitFailure(errorMessage);
		}
	};

	return (
		<form id={formId} onSubmit={handleSubmit(handleSubmitResetPassword)}>
			<Stack direction="column" spacing={2}>
				<FormControl id="email">
					<TextField
						type="email"
						label="Email Address"
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
						{...register("email")}
						required
					/>
				</FormControl>
			</Stack>
		</form>
	);
};
