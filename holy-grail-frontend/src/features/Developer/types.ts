import { CategoryType, DocumentType, SubjectType } from '@api/library';

export type DataTypeKey = 'categories' | 'subjects' | 'types';

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

export interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newName: string) => void;
}

export interface DeveloperEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newValue: string) => Promise<void>;
  initialName: string;
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
  data: Array<CategoryType | SubjectType | DocumentType>;
  handleEdit: (id: number, type: DataTypeKey) => void;
  handleAdd: () => void;
  type: DataTypeKey;
}
