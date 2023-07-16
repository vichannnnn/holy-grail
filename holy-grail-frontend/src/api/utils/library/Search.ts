import apiClient from '../../apiClient';

export type PaginatedNotes = {
  items: Note[];
  page: number;
  pages: number;
  size: number;
  total: number;
};

export type Note = {
  id: number;
  category: number;
  subject: number;
  type: number;
  document_name: string;
  file_name: string;
  uploaded_by: number;
  uploaded_on: string;
  doc_category: {
    id: number;
    name: string;
  };
  doc_subject: {
    id: number;
    name: string;
  };
  doc_type: {
    id: number;
    name: string;
  };
  account: {
    user_id: number;
    username: string;
  };
};

export interface CommonType {
  id: number;
  name: string;
}

export type CategoryType = CommonType;

export type DocumentType = CommonType;
export interface SubjectType extends CommonType {
  category_id: number;
}

export const fetchData = async (category_id: number | null = null) => {
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

export const fetchCategory = async (searchParams: { category_id: number }) => {
  const response = await apiClient.get<CategoryType>('/category', {
    params: searchParams,
  });
  return response.data;
};

export const fetchApprovedNotes = async (searchParams: {
  category?: string;
  subject?: string;
  doc_type?: string;
  keyword?: string;
  page?: number;
  size?: number;
}) => {
  const response = await apiClient.get<PaginatedNotes>('/notes/approved', {
    params: searchParams,
  });
  return response.data;
};

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
