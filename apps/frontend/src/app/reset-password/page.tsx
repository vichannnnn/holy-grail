import { ResetPassword } from "@features/TokenVerification";

import { generateResetPasswordMetadata } from "@utils/metadata";

export const generateMetadata = generateResetPasswordMetadata;

const ResetPasswordPage = () => {
	return (
		<>
			<ResetPassword />
		</>
	);
};

export default ResetPasswordPage;
