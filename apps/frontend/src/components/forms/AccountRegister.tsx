import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, Stack } from "@mui/material";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { AccountDetails } from "@api/auth";

import { PasswordField, TextField } from "@components/TextField";

import { AuthContext } from "@providers/AuthProvider";

import { RegisterValidation } from "@utils/forms";

import { FormProps } from "@forms/types";

export const AccountRegisterForm = ({ onSubmitSuccess, onSubmitFailure, formId }: FormProps) => {
	const { registerUserAccount } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountDetails>({
		// defaultValues: {
		//   marketing_consent: false,
		// },
		resolver: yupResolver(RegisterValidation),
	});

	const handleRegister = async (formData: AccountDetails) => {
		try {
			onSubmitFailure(null);
			await registerUserAccount(formData);
			onSubmitSuccess();
		} catch (error) {
			const axiosError = error as AxiosError<{ detail?: string }>;

			if (axiosError.response && axiosError.response.status === 409) {
				onSubmitFailure("An account with this username or email already exists.");
			} else if (axiosError.response && axiosError.response.status === 422) {
				onSubmitFailure("Invalid input. Please check the form fields and try again.");
			} else {
				onSubmitFailure(axiosError.message);
			}
		}
	};

	return (
		<form id={formId} onSubmit={handleSubmit(handleRegister)}>
			<Stack direction="column" spacing={2}>
				<FormControl id="username">
					<TextField
						type="text"
						label="Username"
						error={Boolean(errors.username)}
						helperText={errors.username?.message}
						{...register("username")}
						required
					/>
				</FormControl>
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
				<FormControl id="password">
					<PasswordField
						label="Password"
						error={Boolean(errors.password)}
						helperText={errors.password?.message}
						{...register("password")}
						required
					/>
				</FormControl>
				<FormControl id="repeat-password">
					<PasswordField
						label="Repeat Password"
						error={Boolean(errors.repeat_password)}
						helperText={errors.repeat_password?.message}
						{...register("repeat_password")}
						required
					/>
				</FormControl>
				{/*<div className='flex items-start'>*/}
				{/*  <FormControl id='marketing-consent'>*/}
				{/*    <Controller*/}
				{/*      name='marketing_consent'*/}
				{/*      control={control}*/}
				{/*      render={({ field }) => (*/}
				{/*        <Checkbox*/}
				{/*          {...field}*/}
				{/*          disableRipple*/}
				{/*          checked={field.value}*/}
				{/*          onChange={(e) => field.onChange(e.target.checked)}*/}
				{/*          sx={{*/}
				{/*            color: '#949494',*/}
				{/*            '&.Mui-checked': {*/}
				{/*              color: '#949494',*/}
				{/*            },*/}
				{/*            '&:hover': {*/}
				{/*              backgroundColor: 'transparent',*/}
				{/*            },*/}
				{/*            padding: 0,*/}
				{/*            paddingRight: 2,*/}
				{/*          }}*/}
				{/*        />*/}
				{/*      )}*/}
				{/*    />*/}
				{/*  </FormControl>*/}
				{/*  <h6>*/}
				{/*    I agree to receive emails about FastAPI Boilerplate and related Himari product and*/}
				{/*    feature updates and promotions from FastAPI Boilerplate.*/}
				{/*  </h6>*/}
				{/*</div>*/}
				<h6>
					By creating an account, you confirm that you have read and agree to our{" "}
					<a href="/privacy" className="text-inherit">
						Privacy Policy
					</a>{" "}
					and{" "}
					<a href="/terms-of-service" className="text-inherit">
						Terms of Service
					</a>
					, including how we collect, use, and share your data.
				</h6>
			</Stack>
		</form>
	);
};
