import { CategoryType, DocumentType, SubjectType, CommonType } from '@api/library';

export interface OptionsProps {
  categories: CategoryType[];
  subjects: SubjectType[];
  types: DocumentType[];
  years: CommonType[];
}

export interface NotesProps {
  [key: string]: NoteInfoProps;
}

export interface NoteInfoProps {
  category: number;
  subject: number;
  type: number;
  year?: number;
  name: string;
  valid: boolean;
}

export interface UploadNoteProps {
  fileName: string;
  options: OptionsProps | null;
  saveNoteUpdates: (note: NoteInfoProps) => void;
  deleteNote: () => void;
  errors?: string[];
}

export interface FileSelectProps {
  handleAddNotes: (files: FileList) => void;
}
export interface SelectedFilesProps {
  [key: string]: [File, string];
}

// Upload error types

export enum UploadNoteErrorType {
  DOCUMENT_NAME_DUPLICATED = 'DOCUMENT_NAME_DUPLICATED',
  DOCUMENT_NAME_IN_DB = 'DOCUMENT_NAME_IN_DB',
  SCHEMA_VALIDATION_ERROR = 'SCHEMA_VALIDATION_ERROR',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
}

export const UploadNoteErrorText: Record<UploadNoteErrorType, string> = {
  [UploadNoteErrorType.DOCUMENT_NAME_DUPLICATED]:
    'You are uploading multiple documents with the same name.',
  [UploadNoteErrorType.DOCUMENT_NAME_IN_DB]: 'Document name already exists.',
  [UploadNoteErrorType.SCHEMA_VALIDATION_ERROR]:
    'Please ensure your document name is between 1 and 100 characters long.',
  [UploadNoteErrorType.INVALID_FILE_TYPE]: 'Please ensure all files uploaded are pdf files.',
};

export type UploadNoteIndexedErrors = Record<number, string[]>;
