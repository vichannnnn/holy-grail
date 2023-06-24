import { Box, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface AdminApproveIconProps {
  noteId: number;
  handleApprove: (id: number) => void;
}
const AdminApproveIcon = ({ noteId, handleApprove }: AdminApproveIconProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton size='small' color='primary' onClick={() => handleApprove(noteId)}>
      <CheckIcon />
    </IconButton>
  </Box>
);

export default AdminApproveIcon;
