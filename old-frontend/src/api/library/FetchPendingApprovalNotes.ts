import { apiClient } from '@apiClient';
import { NotesSearchParams, PaginatedNotes } from './types';
export const fetchPendingApprovalNotes = async (searchParams: NotesSearchParams) => {
  if (searchParams.year === 0) {
    delete searchParams.year;
  }

  const response = await apiClient.get<PaginatedNotes>('/notes/pending', {
    params: searchParams,
  });
  return response.data;
};
