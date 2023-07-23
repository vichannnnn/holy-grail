import { useContext, useState } from 'react';
import { CategoryType, SubjectType, DocumentType } from '@api/library';
import { Pagination } from '@components';
import { TabContentProps, User } from '@features';
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
import '../Library/library.css';
import { MediaQueryContext } from '@providers';

export const TabContent = ({ title, data, handleEdit, handleAdd, type }: TabContentProps) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [chunkSize, setChunkSize] = useState<number>(10);
  const { isDesktop } = useContext(MediaQueryContext);

  const handleEditClick = (id: number) => {
    handleEdit(id, type);
  };

  const isUser = (option: CategoryType | SubjectType | DocumentType | User): option is User => {
    return (option as User).username !== undefined;
  };

  const isSubject = (
    option: CategoryType | SubjectType | DocumentType | User,
  ): option is SubjectType => {
    return (option as SubjectType).name !== undefined;
  };

  const hasName = (
    option: CategoryType | SubjectType | DocumentType | User,
  ): option is CategoryType | SubjectType | DocumentType => {
    return (option as CategoryType).name !== undefined;
  };

  const handleFilterContent = () => {
    const validData: Array<CategoryType | SubjectType | DocumentType | User> = data.filter(
      (option: CategoryType | SubjectType | DocumentType | User) => {
        if (hasName(option)) {
          return option.name.toLowerCase().includes(query.toLowerCase());
        } else if (isUser(option)) {
          return option.username.toLowerCase().includes(query.toLowerCase());
        }
        return false;
      },
    );
    return validData;
  };

  const handlePaging = () => {
    const pagedData: Array<Array<CategoryType | SubjectType | DocumentType | User>> = [];
    const validData: Array<CategoryType | SubjectType | DocumentType | User> =
      handleFilterContent();
    for (let i = 0; i < validData.length; i += chunkSize) {
      pagedData.push(validData.slice(i, i + chunkSize));
    }
    return pagedData;
  };

  return (
    <section className='materials container'>
      <Grid container alignItems='center' sx={{ paddingTop: '3%', paddingBottom: '3%' }}>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <Box display='flex' justifyContent='center'>
            <h2>{title}</h2>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display='flex' justifyContent='flex-end'>
            <Button variant='contained' onClick={handleAdd}>
              + Add
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='table__header'>ID</TableCell>
              <TableCell className='table__header'>Name</TableCell>
              <TableCell className='table__header'>Category</TableCell>
              <TableCell className='table__header'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(handlePaging()[page] || []).map((item) => (
              <TableRow key={isUser(item) ? item.user_id : item.id}>
                <TableCell className='table__content' component='th' scope='row'>
                  {isUser(item) ? item.user_id : item.id}
                </TableCell>
                <TableCell className='table__content' component='th' scope='row'>
                  {isUser(item) ? item.username : item.name}
                </TableCell>
                {isSubject(item) && (
                  <TableCell className='table__content' component='th' scope='row'>
                    {item.category.name}
                  </TableCell>
                )}
                <TableCell className='table__content' component='th' scope='row'>
                  <Button onClick={() => handleEditClick(isUser(item) ? item.user_id : item.id)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        pageInfo={{
          page: page + 1,
          size: chunkSize,
          total: handleFilterContent().length,
          pages: handlePaging().length,
        }}
        handlePageChange={(newPage: number) => {
          setPage(newPage - 1);
        }}
      />
    </section>
  );
};
