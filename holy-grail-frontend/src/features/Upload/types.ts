import { CategoryType, DocumentType, SubjectType, CommonType } from '@api/library';
import { Control, useForm } from 'react-hook-form';

export interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
  years: CommonType[];
}

export interface NoteInfoProps {
  category: number;
  subject: number;
  type: number;
  year?: number;
  name: string;
  file: File;
}

type FormReturnType = {
  control: Control<{ notes: NoteInfoProps[] }>;
  handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
  register: ReturnType<typeof useForm>['register'];
  formState: ReturnType<typeof useForm>['formState'];
};

export interface UploadNoteProps {
  options: OptionsProps | null;
  deleteNote: () => void;
  errors?: boolean;
  control: Control<{ notes: NoteInfoProps[] }>;
  register: FormReturnType['register'];
  field: { id: string };
  index: number;
}

export interface FileSelectProps {
  handleAddNotes: (files: FileList) => void;
}
