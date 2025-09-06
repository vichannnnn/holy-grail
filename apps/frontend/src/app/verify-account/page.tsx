import { VerifyEmail } from "@features/TokenVerification";

import { generateVerifyAccountMetadata } from "@utils/metadata";

export const generateMetadata = generateVerifyAccountMetadata;

const AccountVerifyPage = () => {
	return (
		<>
			<VerifyEmail />
		</>
	);
};

export default AccountVerifyPage;
