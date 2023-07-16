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
