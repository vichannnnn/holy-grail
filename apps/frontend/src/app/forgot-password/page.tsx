import { AuthenticationLayout } from "@layouts/Authentication/AuthenticationLayout";

import { ForgotPassword } from "@components/Authentication";

import { generateForgotPasswordMetadata } from "@utils/metadata";

export const generateMetadata = generateForgotPasswordMetadata;

const ForgotPasswordPage = () => {
	return (
		<>
			<AuthenticationLayout>
				<ForgotPassword />
			</AuthenticationLayout>
		</>
	);
};

export default ForgotPasswordPage;
