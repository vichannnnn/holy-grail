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
		} catch {
			toast.error("An unexpected error occurred. Please try again later.");
		}
	};

	return (
		<span
			role="button"
			className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-colors"
			onClick={handleResendEmail}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleResendEmail();
				}
			}}
		>
			{children}
		</span>
	);
}
