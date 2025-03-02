import { apiClient } from '@apiClient';
import { CategoryType } from './types';

export const fetchAllCategories = async (): Promise<CategoryType[]> => {
  const response = await apiClient.get('/all_category_level');
  const categories = response.data;

  return categories.map((category: CategoryType) => ({
    id: category.id,
    name: category.name,
  }));
};
