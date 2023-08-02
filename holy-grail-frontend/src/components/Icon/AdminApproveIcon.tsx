import CheckIcon from '@mui/icons-material/Check';

interface AdminApproveIconProps {
  noteId: number;
  handleApprove: (id: number) => void;
}
export const AdminApproveIcon = ({ noteId, handleApprove }: AdminApproveIconProps) => (
  <CheckIcon className='admin-icon' color='primary' onClick={() => handleApprove(noteId)} />
);
