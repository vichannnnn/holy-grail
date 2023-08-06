import { apiClient } from '@apiClient';
import { CategoryType, SubjectType, DocumentType, CategorySearchParams } from './types';
import { fetchAllUsers } from '@api/actions';
import { User } from '@features';
export const fetchData = async (searchParams: CategorySearchParams | null = null) => {
  const [categories, types] = await Promise.all([
    apiClient.get('/all_category_level'),
    apiClient.get('/all_document_type'),
  ]);

  let subjects;
  if (searchParams !== null) {
    subjects = await apiClient.get('/all_subjects', {
      params: { category_id: searchParams.category_id },
    });
  } else {
    subjects = await apiClient.get('/all_subjects');
  }

  let users: User[];

  try {
    users = await fetchAllUsers();
  } catch (error) {
    users = [];
  }

  return {
    categories: categories.data.map((category: CategoryType) => ({
      id: category.id,
      name: category.name,
    })),
    subjects: subjects.data.map((subject: SubjectType) => ({
      id: subject.id,
      name: subject.name,
      category: subject.category,
    })),
    types: types.data.map((type: DocumentType) => ({
      id: type.id,
      name: type.name,
    })),
    users: users.map((user: User) => ({
      user_id: user.user_id,
      username: user.username,
      role: user.role,
    })),
    years: Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2008 + i).map((year) => ({
      id: year,
      name: `${year}`,
    })),
  };
};
