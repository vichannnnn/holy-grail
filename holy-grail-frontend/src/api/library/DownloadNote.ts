import { apiClient } from '@apiClient';
import { Note } from './types';

const getExtensionFromFilename = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? `.${parts.pop()}` : '';
};

export const downloadNote = async (note: Note) => {
  const response = await apiClient.get(`/note/download/${note.id}`, {
    responseType: 'arraybuffer',
  });
  const extension = getExtensionFromFilename(note.file_name);

  if (response.status === 200) {
    const blob = new Blob([response.data]);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${note.document_name}${extension}`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } else {
    console.error('File not found');
  }
};
