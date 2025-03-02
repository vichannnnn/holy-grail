// Holy Grail API Request

export interface NotesSearchParams {
  category?: string;
  subject?: string;
  doc_type?: string;
  keyword?: string;
  page?: number;
  size?: number;
  year?: number;
  sorted_by_upload_date?: string;
}

export interface CategorySearchParams {
  category_id: number;
}

// Holy Grail API Response

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
  year: number;
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
  extension: string;
};

export interface CommonType {
  id: number;
  name: string;
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface DocumentType {
  id: number;
  name: string;
}

export interface SubjectType {
  id: number;
  name: string;
  category: CategoryType;
}
