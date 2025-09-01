import { DeveloperPanel } from "@layouts/Developer/DeveloperPanel";

import { generateDeveloperPanelMetadata } from "@utils/metadata";

export const generateMetadata = generateDeveloperPanelMetadata;

const DeveloperPage = () => {
	return (
		<>
			<DeveloperPanel />
		</>
	);
};

export default DeveloperPage;
