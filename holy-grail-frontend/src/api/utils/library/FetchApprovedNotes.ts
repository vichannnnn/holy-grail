import { apiClient } from '@apiClient';
import { PaginatedNotes, NotesSearchParams } from './types';
export const fetchApprovedNotes = async (searchParams: NotesSearchParams) => {
  const response = await apiClient.get<PaginatedNotes>('/notes/approved', {
    params: searchParams,
  });
  return response.data;
};
