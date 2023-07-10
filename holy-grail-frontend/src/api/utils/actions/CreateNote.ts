import { AxiosError, all } from 'axios';
import apiClient from '../../apiClient';
import { NoteInfoProps } from '../../../features/Upload/UploadNote';

export const createNote = async (notes: NoteInfoProps[]) => {
  const allData = new FormData();
  allData.append('maxIndex', String(notes.length - 1));
  notes.forEach((note, index) => {
    allData.append(`file ${index}`, note.file as File);
    allData.append(`category ${index}`, String(note.category));
    allData.append(`subject ${index}`, String(note.subject));
    allData.append(`type ${index}`, String(note.type));
    allData.append(`document_name ${index}`, String(note.name));
  });

  try {
    const response = await apiClient.post('/note/', allData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.status;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response ? axiosError.response.status : 500;
  }
};
