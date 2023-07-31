import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
} from '@mui/material';
import { FreeTextCombobox } from '@components';
import { RoleEnum, User } from '@features';
import EditIcon from '@mui/icons-material/Edit';
import '../Library/library.css';
import { useState } from 'react';

export const TabContentUsers = ({ data }: { data: User[] }) => {
  const [query, setQuery] = useState<string>('');
  const handleFilterContent = () => {
    const validData = (data as Array<User>).filter((option: User) =>
      option.username.toLowerCase().includes(query.toLowerCase()),
    );
    return validData;
  };

  const handlePaging = () => {
    const pagedData: Array<Array<User>> = [];
    const validData: Array<User> = handleFilterContent();
    for (let i = 0; i < validData.length; i += 10) {
      pagedData.push(validData.slice(i, i + 10));
    }
    return pagedData;
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
      <Grid item xs={12} sm={4}>
        <Box display='flex' justifyContent='space-between' gap='10%'>
          <FreeTextCombobox
            label='Search for users'
            value={query}
            onChange={(newValue: string) => setQuery(newValue)}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='table__header'>User Id</TableCell>
              <TableCell className='table__header'>Username</TableCell>
              <TableCell className='table__header'>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.user_id}>
                <TableCell className='table__content' component='th' scope='row'>
                  {item.user_id}
                </TableCell>
                <TableCell className='table__content' component='th' scope='row'>
                  {item.username}
                </TableCell>
                <TableCell className='table__content' component='th' scope='row'>
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
    </section>
  );
};
