"use client";
import { useTransition } from "react";
import { Button } from "@shared/ui/components";
import { resendVerificationEmail } from "@/app/account/_components/ResendVerifyEmail/actions";
import toast from "react-hot-toast";

export function ResendVerifyButton() {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			try {
				const result = await resendVerificationEmail();
				if (result.ok) {
					toast.success(result.message);
				} else {
					toast.error(result.message);
				}
			} catch {
				toast.error("An unexpected error occurred. Please try again later.");
			}
		});
	};

	return (
		<Button type="button" onClick={handleClick} disabled={isPending}>
			{isPending ? "Sending..." : "Resend Verification Email"}
		</Button>
	);
}
