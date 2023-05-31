import apiClient from "../../api/apiClient";

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

export type SubjectType = CommonType;

export type DocumentType = CommonType;

export const fetchData = async () => {
  const [categories, subjects, types] = await Promise.all([
    apiClient.get("/all_category_level"),
    apiClient.get("/all_subjects"),
    apiClient.get("/all_document_type"),
  ]);

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

export const fetchApprovedNotes = async (searchParams: {
  category?: string;
  subject?: string;
  doc_type?: string;
  page?: number;
  size?: number;
}) => {
  const response = await apiClient.get<PaginatedNotes>("/notes/approved", {
    params: searchParams,
  });
  return response.data;
};

export const fetchPendingApprovalNotes = async (searchParams: {
  category?: string;
  subject?: string;
  doc_type?: string;
  page?: number;
  size?: number;
}) => {
  const response = await apiClient.get<PaginatedNotes>("/notes/pending", {
    params: searchParams,
  });
  return response.data;
};

// export function useMatch(term: string, items: string[]) {
//   return useMemo(() => {
//     if (term.trim() === "") {
//       return items;
//     } else {
//       const results = matchSorter(items, term, {
//         keys: [(item) => item],
//       });
//
//       return results.length > 0 ? results : [];
//     }
//   }, [term, items]);
// }
