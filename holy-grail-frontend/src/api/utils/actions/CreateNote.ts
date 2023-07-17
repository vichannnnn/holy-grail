import { AxiosError } from 'axios';
import { apiClient } from '@apiClient';
import { NoteInfoProps } from '../../../features/Upload/UploadNote';

export const createNote = async (files: [File, string][], notes: NoteInfoProps[]) => {
  const allData = new FormData();

  // Pair each note with its file
  const noteFilePairs: { file: File; note: NoteInfoProps }[] = files.map((file, idx) => ({
    file: file[0],
    note: notes[idx],
  }));

  // Append each pair to the FormData
  noteFilePairs.forEach((pair, index) => {
    allData.append(`notes[${index}].file`, pair.file);
    allData.append(`notes[${index}].category`, String(pair.note.category));
    allData.append(`notes[${index}].subject`, String(pair.note.subject));
    allData.append(`notes[${index}].type`, String(pair.note.type));
    allData.append(`notes[${index}].document_name`, pair.note.name);
  });

  try {
    const response = await apiClient.post('/note/', allData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response;
  }
};
