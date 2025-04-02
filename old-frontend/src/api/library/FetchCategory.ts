import { apiClient } from '@apiClient';
import { CategoryType, CategorySearchParams } from './types';
export const fetchCategory = async (searchParams: CategorySearchParams) => {
  const response = await apiClient.get<CategoryType>('/category', {
    params: searchParams,
  });
  return response.data;
};
