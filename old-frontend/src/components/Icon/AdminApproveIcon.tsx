import CheckIcon from '@mui/icons-material/Check';
import './AdminIcon.css';

interface AdminApproveIconProps {
  noteId: number;
  handleApprove: (id: number) => void;
}
export const AdminApproveIcon = ({ noteId, handleApprove }: AdminApproveIconProps) => (
  <CheckIcon className='admin-icon' color='primary' onClick={() => handleApprove(noteId)} />
);
