import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box } from '@mui/material';

import { Note } from '@api/library';

export enum AdminActionType {
  APPROVE = 'APPROVE',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
}

interface AdminActionsProps {
  actions: AdminActionType[];
  handleApprove?: (noteId: number) => void;
  setIsAlertOpen?: (isOpen: boolean) => void;
  setNoteId?: (noteId: number) => void;
  setIsEditOpen?: (isOpen: boolean) => void;
  noteProperties?: Note | null;
  setNoteProperties?: (note: Note | null) => void;
  noteId: number;
}

export const AdminActions = ({
  actions,
  handleApprove = () => {},
  setIsAlertOpen = () => {},
  setNoteId = () => {},
  setIsEditOpen = () => {},
  noteProperties = null,
  setNoteProperties = () => {},
  noteId,
}: AdminActionsProps) => {
  const iconClass = 'cursor-pointer hover:opacity-80 transition-opacity duration-200 mx-1';

  return (
    <Box className='flex items-center'>
      {actions.includes(AdminActionType.APPROVE) && (
        <CheckIcon className={iconClass} color='primary' onClick={() => handleApprove(noteId)} />
      )}

      {actions.includes(AdminActionType.DELETE) && (
        <DeleteIcon
          className={iconClass}
          color='error'
          onClick={() => {
            setIsAlertOpen(true);
            setNoteId(noteId);
          }}
        />
      )}

      {actions.includes(AdminActionType.EDIT) && (
        <ModeEditIcon
          className={iconClass}
          color='primary'
          onClick={() => {
            setIsEditOpen(true);
            setNoteId(noteId);
            setNoteProperties(noteProperties);
          }}
        />
      )}
    </Box>
  );
};
