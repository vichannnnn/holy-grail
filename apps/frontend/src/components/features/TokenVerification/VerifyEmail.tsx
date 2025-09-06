"use client";

import {
	TokenActionEnum,
	TokenActionHandler,
} from "@features/TokenVerification/TokenActionHandler";

export const VerifyEmail = () => {
	return <TokenActionHandler action={TokenActionEnum.VERIFY_EMAIL} />;
};
