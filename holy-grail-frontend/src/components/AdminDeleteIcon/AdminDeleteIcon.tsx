import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface AdminDeleteIconProps {
  noteId: number;
  setIsAlertOpen: (isOpen: boolean) => void;
  setNoteId: (id: number) => void;
}
const AdminDeleteIcon = ({
  noteId,
  setIsAlertOpen,
  setNoteId,
}: AdminDeleteIconProps) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <IconButton
      size="small"
      color="error"
      onClick={() => {
        setIsAlertOpen(true);
        setNoteId(noteId);
      }}
    >
      <DeleteIcon />
    </IconButton>
  </Box>
);

export default AdminDeleteIcon;
