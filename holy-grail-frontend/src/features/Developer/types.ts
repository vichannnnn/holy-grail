import { CategoryType, DocumentType, SubjectType } from '@api/library';

export type DataTypeKey = 'categories' | 'subjects' | 'types' | 'users';

export const singularDataType: Record<DataTypeKey, string> = {
  categories: 'category',
  subjects: 'subject',
  types: 'type',
  users: 'user',
};
export interface User {
  user_id: number;
  username: string;
  role: RoleEnum;
}

export enum RoleEnum {
  USER = 1,
  ADMIN = 2,
  DEVELOPER = 3,
}

export interface DeveloperAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulAdd: () => Promise<void>;
  type: DataTypeKey | null;
}

export interface DeveloperEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulUpdate: () => Promise<void>;
  initialName: string;
  type: DataTypeKey | null;
  id: number;
}

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRole: RoleEnum) => Promise<void>;
  initialRole: RoleEnum;
  userName: string;
  userId: number;
}

export interface TabContentProps {
  title: string;
  data: Array<CategoryType | SubjectType | DocumentType | User>;
  handleEdit: (id: number, type: DataTypeKey) => void;
  handleAdd: () => void;
  type: DataTypeKey;
}

export interface AddTypeDetails {
  name: string;
}

export interface AddSubjectDetails extends AddTypeDetails {
  category_id: number;
}

export interface UpdateTypeDetails {
  name: string;
}
