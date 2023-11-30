import { CategoryType, DocumentType, SubjectType } from '@api/library';

export type DataTypeKey = 'categories' | 'subjects' | 'types' | 'users';

export enum DataTypeEnum {
  CATEGORY = 'category',
  SUBJECT = 'subject',
  TYPE = 'type',
  USER = 'user',
}

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
  onSuccessfulAdd: () => void;
  type: DataTypeKey | null;
}

export interface DeveloperEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: DataTypeKey;
  initialData: {
    id: number;
    name: string;
  };
  onSuccessfulUpdate: () => void;
}

export interface DeveloperEditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: number;
    name: string;
    category: CategoryType;
  };
  onSuccessfulUpdate: () => void;
}

export interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: User;
  onSuccessfulUpdate: () => void;
}

export interface TabContentProps {
  title: string;
  data: CategoryType[] | DocumentType[];
  type: DataTypeKey;
  fetchData: () => void;
}

export interface TabContentSubjectProps {
  title: string;
  data: SubjectType[];
  fetchData: () => void;
}

export interface TabContentUsersProps {
  data: User[];
  fetchData: () => void;
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

export interface UpdateSubjectDetails extends UpdateTypeDetails {
  category_id: number;
}

export interface UpdateUserDetails {
  role: RoleEnum;
}
