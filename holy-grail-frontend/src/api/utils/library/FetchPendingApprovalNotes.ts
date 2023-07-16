import { apiClient } from '@apiClient';
import { PaginatedNotes } from './types';
export const fetchPendingApprovalNotes = async (searchParams: {
  category?: string;
  subject?: string;
  doc_type?: string;
  keyword?: string;
  page?: number;
  size?: number;
}) => {
  const response = await apiClient.get<PaginatedNotes>('/notes/pending', {
    params: searchParams,
  });
  return response.data;
};
