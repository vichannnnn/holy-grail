import { Box } from '@mui/material';
import { AdminApproveIcon, AdminDeleteIcon, AdminEditIcon } from '@components';
import { Note } from '@api/library';
import './AdminActions.css';

interface AdminActionsProps {
  displayApprove?: boolean;
  displayDelete?: boolean;
  displayEdit?: boolean;
  handleApprove?: (noteId: number) => void;
  setIsAlertOpen?: (isOpen: boolean) => void;
  setNoteId?: (noteId: number) => void;
  setIsEditOpen?: (isOpen: boolean) => void;
  noteProperties?: Note | null;
  setNoteProperties?: (note: Note | null) => void;
  noteId: number;
}

export const AdminActions = ({
  displayApprove = true,
  displayDelete = true,
  displayEdit = true,
  handleApprove = () => {},
  setIsAlertOpen = () => {},
  setNoteId = () => {},
  setIsEditOpen = () => {},
  noteProperties = null,
  setNoteProperties = () => {},
  noteId,
}: AdminActionsProps) => (
  <Box className='admin-actions'>
    {displayApprove && <AdminApproveIcon handleApprove={handleApprove} noteId={noteId} />}
    {displayDelete && (
      <AdminDeleteIcon setIsAlertOpen={setIsAlertOpen} setNoteId={setNoteId} noteId={noteId} />
    )}
    {displayEdit && (
      <AdminEditIcon
        setIsEditOpen={setIsEditOpen}
        setNoteId={setNoteId}
        noteId={noteId}
        noteProperties={noteProperties}
        setNoteProperties={setNoteProperties}
      />
    )}
  </Box>
);
