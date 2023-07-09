import { AxiosError } from 'axios';
import apiClient from '../../apiClient';
import { NoteInfoProps } from '../../../features/Upload/UploadNote';

export const createNote = async (notes: NoteInfoProps[]) => {
  for (const note of notes) {
    if (note.file === null) {
      return 400;
    }
    const formData = new FormData();
    formData.append('file', note.file);
    formData.append('category', String(note.category));
    formData.append('subject', String(note.subject));
    formData.append('type', String(note.type));
    formData.append('document_name', String(note.name));

    try {
      const response = await apiClient.post('/note/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          category: String(note.category),
          subject: String(note.subject),
          type: String(note.type),
          document_name: String(note.name),
        },
      });
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError;
      return axiosError.response ? axiosError.response.status : 500;
    }
  }
};
