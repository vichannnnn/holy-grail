import { AxiosError } from 'axios';
import { apiClient } from '@apiClient';
import { NoteInfoProps } from '@features';

export const createNote = async (files: [File, string][], notes: NoteInfoProps[]) => {
  const allData = new FormData();

  const noteFilePairs: { file: File; note: NoteInfoProps }[] = files.map((file, idx) => ({
    file: file[0],
    note: notes[idx],
  }));

  noteFilePairs.forEach((pair, index) => {
    allData.append(`notes[${index}].file`, pair.file);
    allData.append(`notes[${index}].category`, String(pair.note.category));
    allData.append(`notes[${index}].subject`, String(pair.note.subject));
    allData.append(`notes[${index}].type`, String(pair.note.type));
    allData.append(`notes[${index}].year`, String(pair.note.year));
    allData.append(`notes[${index}].document_name`, pair.note.name);
  });

  try {
    return await apiClient.post('/note', allData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.response;
  }
};
