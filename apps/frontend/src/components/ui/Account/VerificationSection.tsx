import { Cancel, CheckCircle } from "@mui/icons-material";
import { AxiosError } from "axios";

import { resendVerificationEmail } from "@api/auth";

import { useToast } from "@providers/ToastProvider";

export const VerificationSection = ({ verified }: { verified: boolean }) => {
	const { showToast } = useToast();

	const handleResendVerificationEmail = async () => {
		try {
			await resendVerificationEmail();
			showToast({
				description: "Please check your email for the verification mail sent to you.",
				severity: "success",
			});
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.status === 400) {
				showToast({
					description: "Your account email is already verified.",
					severity: "error",
				});
			} else {
				showToast({
					description: "An error occurred while attempting to resend.",
					severity: "error",
				});
			}
		}
	};

	if (verified) {
		return (
			<>
				<div className="flex items-center mt-1 text-green-400">
					<CheckCircle className="mr-2" />
					Verified
				</div>
				<p className="text-sm mt-1">Your account is email verified.</p>
			</>
		);
	} else {
		return (
			<>
				<div className="flex items-center mt-1 text-red-400">
					<Cancel className="mr-2" />
					Unverified
				</div>
				<p className="text-sm mt-1">
					Your account is not yet email verified.
					<br />
					Please click{" "}
					<a className="cursor-pointer font-bold text-sm" onClick={handleResendVerificationEmail}>
						here
					</a>{" "}
					to send another verification mail to your email.
				</p>
			</>
		);
	}
};
