"use client";

import { useState } from "react";

import { Button } from "@components/Button";
import { ErrorText, SectionTitle } from "@components/Typography";

import { useToast } from "@providers/ToastProvider";

import { useNavigate } from "@utils/navigation";

import { AccountLoginForm } from "@forms/AccountLogin";
import { FormEnum } from "@forms/types";

export const AccountLogin = () => {
	const [loginError, setLoginError] = useState<string | null>(null);

	const { showToast } = useToast();
	const router = useNavigate();

	const handleLoginFailure = (errorMessage: string | null) => {
		setLoginError(errorMessage);
	};

	const handleLoginSuccess = () => {
		setLoginError(null);
		showToast({
			description: `Successfully logged on.`,
			severity: "success",
		});
		router.navigateTo("/");
	};

	const handleRedirectToForgotPasswordPage = () => {
		router.navigateTo("/forgot-password");
	};

	const handleRedirectToRegisterAccountPage = () => {
		router.navigateTo("/register");
	};

	return (
		<div className="flex flex-col justify-center h-screen w-1/2 m-auto">
			<SectionTitle title="Log in to your account" />
			<AccountLoginForm
				onSubmitSuccess={handleLoginSuccess}
				onSubmitFailure={handleLoginFailure}
				formId={FormEnum.ACCOUNT_LOGIN_FORM_ID}
			/>
			<p className="mt-3">
				Forgot your password? Click{" "}
				<span className="cursor-pointer font-bold" onClick={handleRedirectToForgotPasswordPage}>
					here
				</span>
				.
			</p>
			<div className="flex flex-col justify-center mt-6 gap-3 w-full">
				{loginError && <ErrorText>{loginError}</ErrorText>}
				<Button
					className="w-full"
					// TODO: We should probably set this in the MUI custom palette (sure but ideally not) for this Tori Pink
					// TODO: color or in our Tailwind custom class (best option).
					// TODO: We need to solve the issue of MUI default color overriding Tailwind custom class as well.
					sx={{
						color: "black",
						backgroundColor: "#FFA5A5",
						"&:hover": {
							backgroundColor: "#cc8484",
							border: "none",
						},
					}}
					form={FormEnum.ACCOUNT_LOGIN_FORM_ID}
					type="submit"
				>
					Log In
				</Button>
			</div>
			<p className="mt-3">
				Don&apos;t have an account yet? Register{" "}
				<span className="cursor-pointer font-bold" onClick={handleRedirectToRegisterAccountPage}>
					here
				</span>
				.
			</p>
		</div>
	);
};
