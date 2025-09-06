"use client";

import { useState } from "react";

import { Button } from "@components/Button";
import { ErrorText, SectionTitle } from "@components/Typography";

import { useToast } from "@providers/ToastProvider";

import { ForgotPasswordForm } from "@forms/ForgotPassword";
import { FormEnum } from "@forms/types";

export const ForgotPassword = () => {
	const [error, setError] = useState<string | null>(null);
	const { showToast } = useToast();

	const handleSubmitFailure = (errorMessage: string | null) => {
		setError(errorMessage);
	};

	const handleSubmitSuccess = () => {
		setError(null);
		showToast({
			severity: "success",
			description: "A verification email has been sent to your registered email.",
		});
	};

	return (
		<div className="flex flex-col justify-center h-screen w-1/2 m-auto">
			<SectionTitle
				title="Forgot your password?"
				description="Please enter the email you registered the account with to reset your password."
			/>
			<ForgotPasswordForm
				onSubmitSuccess={handleSubmitSuccess}
				onSubmitFailure={handleSubmitFailure}
				formId={FormEnum.FORGOT_PASSWORD_FORM_ID}
			/>
			<div className="flex flex-col justify-center mt-6 gap-3 w-full">
				{error && <ErrorText>{error}</ErrorText>}
				<Button
					className="w-full"
					// TODO: We should probably set this in the MUI custom palette (sure but ideally not) for this Tori Pink
					//  TODO: color or in our Tailwind custom class (best option).
					// TODO: We need to solve the issue of MUI default color overriding Tailwind custom class as well.
					sx={{
						color: "black",
						backgroundColor: "#FFA5A5",
						"&:hover": {
							backgroundColor: "#cc8484",
							border: "none",
						},
					}}
					form={FormEnum.FORGOT_PASSWORD_FORM_ID}
					type="submit"
				>
					Reset Password
				</Button>
			</div>
		</div>
	);
};
