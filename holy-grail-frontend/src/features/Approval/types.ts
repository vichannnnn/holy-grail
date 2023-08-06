import { ComboboxProps } from '@components';

export type ValidationResult = Record<string, boolean>;
export interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface ApprovalEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newCategory: number | '',
    newSubject: number | '',
    newType: number | '',
    newDocName: string | '',
    newYear: number | '',
  ) => void;
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  years: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  year: ComboboxProps['value'];
  documentName: string;
}
