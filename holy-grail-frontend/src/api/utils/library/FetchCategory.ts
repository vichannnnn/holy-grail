import { apiClient } from '@apiClient';
import { CategoryType } from './types';
export const fetchCategory = async (searchParams: { category_id: number }) => {
  const response = await apiClient.get<CategoryType>('/category', {
    params: searchParams,
  });
  return response.data;
};
