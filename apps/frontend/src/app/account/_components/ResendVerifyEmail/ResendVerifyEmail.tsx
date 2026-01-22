"use client";
import { toast } from "react-hot-toast";
import { resendVerificationEmail } from "./actions";

interface ResendVerifyEmailProps {
	children: React.ReactNode;
}

export function ResendVerifyEmail({ children }: Readonly<ResendVerifyEmailProps>) {
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
		<button
			type="button"
			className="text-amber font-semibold cursor-pointer hover:underline transition-colors"
			onClick={handleResendEmail}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleResendEmail();
				}
			}}
		>
			{children}
		</button>
	);
}
