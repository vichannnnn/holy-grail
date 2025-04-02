import { Library } from '@layouts/Library';

import { generateLibraryMetadata } from '@utils/metadata';

export const generateMetadata = generateLibraryMetadata;

const LibraryPage = () => {
  return (
    <>
      <Library />
    </>
  );
};

export default LibraryPage;
