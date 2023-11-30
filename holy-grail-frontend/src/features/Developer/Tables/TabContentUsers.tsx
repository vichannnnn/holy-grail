import { useState } from 'react';
import { EditPropertiesModal, RoleEnum, TabContentUsersProps, User } from '@features';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../../Library/Library.css';

export const TabContentUsers = ({ data, fetchData }: TabContentUsersProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<User | null>(null);

  const handleEdit = (item: User) => {
    setEditedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <section className='materials container'>
      <Box alignItems='center' sx={{ paddingTop: '3%', paddingBottom: '3%' }}>
        <Grid item xs={12} sm={4}>
          <Box display='flex' justifyContent='center'>
            <h2>Users</h2>
          </Box>
        </Grid>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='table-header'>User Id</TableCell>
              <TableCell className='table-header'>Username</TableCell>
              <TableCell className='table-header'>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.user_id}>
                <TableCell className='table-content' component='th' scope='row'>
                  {item.user_id}
                </TableCell>
                <TableCell className='table-content' component='th' scope='row'>
                  {item.username}
                </TableCell>
                <TableCell className='table-content' component='th' scope='row'>
                  {RoleEnum[item.role]}
                </TableCell>
                <TableCell align='right'>
                  <Button onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isEditModalOpen && editedItem && (
        <EditPropertiesModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={editedItem}
          type={'users'}
          onSuccessfulUpdate={fetchData}
        />
      )}
    </section>
  );
};
