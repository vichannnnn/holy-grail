import { Box, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Note } from '../../api/utils/library/Search';

interface AdminEditIconProps {
  noteId: number;

  setIsEditOpen: (isOpen: boolean) => void;
  setNoteId: (id: number) => void;
  noteProperties: Note | null;
  setNoteProperties: (note: Note | null) => void;
}
const AdminEditIcon = ({
  noteId,
  setIsEditOpen,
  setNoteId,
  noteProperties,
  setNoteProperties,
}: AdminEditIconProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton
      size='small'
      color='primary'
      onClick={() => {
        setIsEditOpen(true);
        setNoteId(noteId);
        setNoteProperties(noteProperties);
      }}
    >
      <ModeEditIcon />
    </IconButton>
  </Box>
);

export default AdminEditIcon;
