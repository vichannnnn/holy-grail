import { apiClient } from '@apiClient';
import { SubjectType } from './types';

export const fetchAllSubjects = async (category_id: number | null): Promise<SubjectType[]> => {
  let subjects;
  if (category_id !== null) {
    subjects = await apiClient.get('/all_subjects', {
      params: { category_id: category_id },
    });
  } else {
    subjects = await apiClient.get('/all_subjects');
  }

  return subjects.data.map((subject: SubjectType) => ({
    id: subject.id,
    name: subject.name,
    category: subject.category,
  }));
};
