import { UploadNote } from '@layouts/UploadNote';

import { generateUploadMetadata } from '@utils/metadata';

export const generateMetadata = generateUploadMetadata;

const UploadPage = () => {
  return (
    <>
      <UploadNote />
    </>
  );
};

export default UploadPage;
