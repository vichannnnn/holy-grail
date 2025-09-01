"use client";

import {
	TokenActionEnum,
	TokenActionHandler,
} from "@features/TokenVerification/TokenActionHandler";

export const ResetPassword = () => {
	return <TokenActionHandler action={TokenActionEnum.RESET_PASSWORD} />;
};
