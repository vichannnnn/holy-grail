import { CategoryType, DocumentType, SubjectType, CommonType } from '@api/library';
import { Control, FieldErrors } from 'react-hook-form';

export interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
  years: CommonType[];
}

export interface NoteInfoProps {
  name: string;
  category: number;
  subject: number;
  type: number;
  year?: number;
  file: File;
}

export interface UploadNoteProps {
  options: OptionsProps | null;
  deleteNote: () => void;
  mirrorNote: () => void;
  errors?: FieldErrors<NoteInfoProps>;
  control: Control<{ notes: NoteInfoProps[] }>;
  field: NoteInfoProps & { id: string };
  watch: (name?: string | string[] | number, defaultValue?: string | number) => string | number;
  index: number;
  resetSubject: (noteIndex: number) => void;
  totalNotesCount: number;
}

export interface FileSelectProps {
  handleAddNotes: (files: FileList) => void;
}

export type NotesFormData = {
  notes: NoteInfoProps[];
};

export enum UploadError {
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  SCHEMA_VALIDATION_ERROR = 'SCHEMA_VALIDATION_ERROR',
}
