import { apiClient } from '@apiClient';
import { Note } from './types';

export const downloadNote = async (note: Note) => {
  const response = await apiClient.get(`/note/download/${note.id}`, {
    responseType: 'arraybuffer',
  });

  if (response.status === 200) {
    const blob = new Blob([response.data]);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${note.document_name}${note.extension}`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } else {
    console.error('File not found');
  }
};
