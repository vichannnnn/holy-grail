import { AxiosError, all } from 'axios';
import apiClient from '../../apiClient';
import { NoteInfoProps } from '../../../features/Upload/UploadNote';

export const createNote = async (files: [File, string][], notes: NoteInfoProps[]) => {
  const allData = new FormData();
  allData.append('maxIndex', String(notes.length - 1));
  const uploads: [File, NoteInfoProps][] = files.map((file, idx) => [file[0], notes[idx]]);

  uploads.forEach((upload: [File, NoteInfoProps], index) => {
    allData.append(`file ${index}`, upload[0]);
    allData.append(`category ${index}`, String(upload[1].category));
    allData.append(`subject ${index}`, String(upload[1].subject));
    allData.append(`type ${index}`, String(upload[1].type));
    allData.append(`document_name ${index}`, String(upload[1].name));
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
