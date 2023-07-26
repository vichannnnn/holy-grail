import { useContext, useState } from 'react';
import { SubjectType } from '@api/library';
import { Pagination, FreeTextCombobox } from '@components';
import { TabContentProps } from '@features';
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

export const TabContentSubjects = ({
  title,
  data,
  handleEdit,
  handleAdd,
}: Omit<TabContentProps, 'type'>) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [chunkSize, setChunkSize] = useState<number>(10);
  const { isDesktop } = useContext(MediaQueryContext);

  const handleFilterContent = () => {
    const validData = (data as Array<SubjectType>).filter((option: SubjectType) =>
      option.name.toLowerCase().includes(query.toLowerCase()),
    );
    return validData;
  };

  const handlePaging = () => {
    const pagedData: Array<Array<SubjectType>> = [];
    const validData: Array<SubjectType> = handleFilterContent();
    for (let i = 0; i < validData.length; i += chunkSize) {
      pagedData.push(validData.slice(i, i + chunkSize));
    }
    return pagedData;
  };

  return (
    <section className='materials container'>
      <Box alignItems='center' sx={{ paddingTop: '3%', paddingBottom: '3%' }}>
        <Grid item xs={12} sm={4}>
          <Box display='flex' justifyContent='center'>
            <h2>{title}</h2>
          </Box>
        </Grid>
      </Box>
      <Grid item xs={12} sm={4}>
        <Box display='flex' justifyContent='space-between' gap='10%'>
          <FreeTextCombobox
            label='Search for subjects'
            value={query}
            onChange={(newValue: string) => setQuery(newValue)}
            sx={{ flexGrow: 1 }}
          />
          <Button variant='contained' onClick={handleAdd}>
            + Add
          </Button>
        </Box>
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
              <TableRow key={item.id}>
                <TableCell className='table__content' component='th' scope='row'>
                  {item.id}
                </TableCell>
                <TableCell className='table__content' component='th' scope='row'>
                  {item.name}
                </TableCell>

                <TableCell className='table__content' component='th' scope='row'>
                  {item.category?.name}
                </TableCell>

                <TableCell className='table__content' component='th' scope='row'>
                  <Button onClick={() => handleEdit(item.id, 'subjects')}>
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
