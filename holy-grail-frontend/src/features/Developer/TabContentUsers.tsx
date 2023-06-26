import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export interface User {
  user_id: number;
  username: string;
  role: RoleEnum;
}

export enum RoleEnum {
  USER = 1,
  ADMIN = 2,
  DEVELOPER = 3,
}

export const TabContentUsers = ({
  data,
  handleEdit,
}: {
  data: User[];
  handleEdit: (id: number) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UserId</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.user_id}>
              <TableCell component='th' scope='row'>
                {item.user_id}
              </TableCell>
              <TableCell component='th' scope='row'>
                {item.username}
              </TableCell>
              <TableCell component='th' scope='row'>
                {RoleEnum[item.role]}
              </TableCell>
              <TableCell align='right'>
                <Button onClick={() => handleEdit(item.user_id)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
