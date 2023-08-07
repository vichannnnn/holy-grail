import { CategorySearchParams, CategoryType, CommonType, DocumentType, SubjectType } from './types';
import {
  fetchAllCategories,
  fetchAllDocumentTypes,
  fetchAllSubjects,
  fetchAllUsers,
} from '@api/library';
import { User } from '@features';

export const fetchLibraryTypes = async (
  searchParams: CategorySearchParams | null = null,
  fetchUsersAsAdmin = false,
): Promise<{
  categories: CategoryType[];
  types: DocumentType[];
  subjects: SubjectType[];
  users: User[];
  years: CommonType[];
}> => {
  const [categories, types, subjects] = await Promise.all([
    fetchAllCategories(),
    fetchAllDocumentTypes(),
    fetchAllSubjects(searchParams ? searchParams.category_id : null),
  ]);

  let users: User[] = [];

  if (fetchUsersAsAdmin) {
    try {
      users = await fetchAllUsers();
    } catch (error) {
      users = [];
    }
  }

  return {
    categories,
    types,
    subjects,
    users,
    years: Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2008 + i).map((year) => ({
      id: year,
      name: `${year}`,
    })),
  };
};
