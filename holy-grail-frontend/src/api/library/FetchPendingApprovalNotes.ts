import { apiClient } from '@apiClient';
import { NotesSearchParams, PaginatedNotes } from './types';
export const fetchPendingApprovalNotes = async (searchParams: NotesSearchParams) => {
  const response = await apiClient.get<PaginatedNotes>('/notes/pending', {
    params: searchParams,
  });
  return response.data;
};
