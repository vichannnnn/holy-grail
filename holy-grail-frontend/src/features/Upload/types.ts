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
