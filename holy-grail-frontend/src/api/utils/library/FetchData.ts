import { apiClient } from '@apiClient';
import { CategoryType, SubjectType, DocumentType, CategorySearchParams } from './types';
export const fetchData = async (category_id: CategorySearchParams | null = null) => {
  const [categories, types] = await Promise.all([
    apiClient.get('/all_category_level'),
    apiClient.get('/all_document_type'),
  ]);

  let subjects;
  if (category_id !== null) {
    subjects = await apiClient.get('/all_subjects', {
      params: { category_id },
    });
  } else {
    subjects = await apiClient.get('/all_subjects');
  }

  return {
    categories: categories.data.map((category: CategoryType) => ({
      id: category.id,
      name: category.name,
    })),
    subjects: subjects.data.map((subject: SubjectType) => ({
      id: subject.id,
      name: subject.name,
    })),
    types: types.data.map((type: DocumentType) => ({
      id: type.id,
      name: type.name,
    })),
  };
};
