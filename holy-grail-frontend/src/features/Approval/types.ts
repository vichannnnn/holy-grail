import { ComboboxProps } from '@components';

export type ValidationResult = Record<string, boolean>;
export interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newCategory: number | '',
    newSubject: number | '',
    newType: number | '',
    newDocName: string | '',
  ) => void;
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  documentName: string;
}
