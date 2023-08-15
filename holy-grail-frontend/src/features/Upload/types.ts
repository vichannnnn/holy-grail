import { CategoryType, DocumentType, SubjectType, CommonType } from '@api/library';
import { Control } from 'react-hook-form';

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

export interface UploadNoteProps {
  options: OptionsProps | null;
  deleteNote: () => void;
  errors?: boolean;
  control: Control<{ notes: NoteInfoProps[] }>;
  field: NoteInfoProps & { id: string };
  watch: (name?: string | string[] | number, defaultValue?: string | number) => string | number;
  index: number;
}

export interface FileSelectProps {
  handleAddNotes: (files: FileList) => void;
}
