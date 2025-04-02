import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Note } from '@api/library';
import './AdminIcon.css';

interface AdminEditIconProps {
  noteId: number;
  setIsEditOpen: (isOpen: boolean) => void;
  setNoteId: (id: number) => void;
  noteProperties: Note | null;
  setNoteProperties: (note: Note | null) => void;
}
export const AdminEditIcon = ({
  noteId,
  setIsEditOpen,
  setNoteId,
  noteProperties,
  setNoteProperties,
}: AdminEditIconProps) => (
  <ModeEditIcon
    className='admin-icon'
    color='primary'
    onClick={() => {
      setIsEditOpen(true);
      setNoteId(noteId);
      setNoteProperties(noteProperties);
    }}
  />
);
