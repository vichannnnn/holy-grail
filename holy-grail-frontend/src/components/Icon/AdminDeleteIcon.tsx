import DeleteIcon from '@mui/icons-material/Delete';
import './AdminIcon.css';

interface AdminDeleteIconProps {
  noteId: number;
  setIsAlertOpen: (isOpen: boolean) => void;
  setNoteId: (id: number) => void;
}
export const AdminDeleteIcon = ({ noteId, setIsAlertOpen, setNoteId }: AdminDeleteIconProps) => (
  <DeleteIcon
    className='admin-icon'
    color='error'
    onClick={() => {
      setIsAlertOpen(true);
      setNoteId(noteId);
    }}
  />
);
