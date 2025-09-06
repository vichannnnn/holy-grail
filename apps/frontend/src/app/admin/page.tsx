import { AdminPanel } from "@layouts/Admin/AdminPanel";

import { generateAdminPanelMetadata } from "@utils/metadata";

export const generateMetadata = generateAdminPanelMetadata;

const AdministratorPage = () => {
	return (
		<>
			<AdminPanel />
		</>
	);
};

export default AdministratorPage;
