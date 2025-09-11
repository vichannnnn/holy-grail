"use client";
import { toast } from "react-hot-toast";
import { resendVerificationEmail } from "./actions";

interface ResendVerifyEmailProps {
	children: React.ReactNode;
}

export function ResendVerifyEmail({ children }: ResendVerifyEmailProps) {
	const handleResendEmail = async () => {
		try {
			const { ok, message } = await resendVerificationEmail();
			if (ok) {
				toast.success(message);
			} else {
				toast.error(message);
			}
		} catch (error) {
			toast.error("An unexpected error occurred. Please try again later.");
		}
	};

	return (
		<span 
			className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-colors"
			onClick={handleResendEmail}
		>
			{children}
		</span>
	);
}
