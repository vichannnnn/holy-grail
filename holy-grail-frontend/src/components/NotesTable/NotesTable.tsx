import { useContext, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { fetchCategory, fetchData, Note, SubjectType } from '@api/library';
import { Combobox, ComboboxProps } from '../../features/Library/Combobox';
import { FreeTextCombobox, FreeTextComboboxProps } from '../../features/Library/FreeTextCombobox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '../Pagination/Pagination';
import { MediaQueryContext } from '../../providers/MediaQueryProvider/MediaQueryProvider';
import '../../features/Library/library.css';
import { NotesIcon } from './NotesIcon';

interface NotesTableProps {
  notes: Note[];
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  keyword: FreeTextComboboxProps['value'];
  onCategoryChange: ComboboxProps['onChange'];
  onSubjectChange: ComboboxProps['onChange'];
  onTypeChange: ComboboxProps['onChange'];
  onKeywordChange: FreeTextComboboxProps['onChange'];
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (page: number) => void;
  renderAdminActions?: (note: Note) => JSX.Element | null;
  isAdmin?: boolean;
}

const VITE_APP_AWS_S3_BUCKET_URL = import.meta.env.VITE_APP_AWS_S3_BUCKET_URL;

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const NotesTable = ({
  notes,
  categories,
  subjects,
  types,
  category,
  subject,
  type,
  keyword,
  onCategoryChange,
  onSubjectChange,
  onTypeChange,
  onKeywordChange,
  pageInfo,
  handlePageChange,
  renderAdminActions,
  isAdmin,
}: NotesTableProps) => {
  const muiTheme = createTheme();
  const { isDesktop } = useContext(MediaQueryContext);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [subjectsData, setSubjectsData] = useState([]);

  return (
    <Box>
      <ThemeProvider theme={muiTheme}>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box
            display='flex'
            flexDirection={isDesktop ? 'row' : 'column'}
            gap={2}
            marginBottom={2}
            sx={{ width: '100%' }}
            alignItems='center'
          >
            <div className='bold-text'>Filter By:</div>
            <Combobox
              label='Category'
              value={category}
              onChange={async (value) => {
                if (onCategoryChange) {
                  onCategoryChange(value);
                  handlePageChange(1);
                }
                if (value) {
                  setIsCategorySelected(true);
                  const categoryData = await fetchCategory({ category_id: value });
                  const data = await fetchData({ category_id: value });
                  setSubjectsData(
                    data.subjects.map((subject: SubjectType) => ({
                      id: subject.id,
                      name: subject.name,
                    })),
                  );
                } else {
                  setIsCategorySelected(false);
                  setSubjectsData([]);
                  if (onSubjectChange) {
                    onSubjectChange('');
                  }
                }
              }}
              options={categories}
              style={{ width: isDesktop ? '15%' : '100%' }}
            />
            <Combobox
              label='Subject'
              value={subject}
              onChange={(value) => {
                if (onSubjectChange) {
                  onSubjectChange(value);
                  handlePageChange(1);
                }
              }}
              options={isCategorySelected ? subjectsData : subjects}
              style={{ width: isDesktop ? '15%' : '100%', opacity: isCategorySelected ? 1 : 0.5 }}
              disabled={!isCategorySelected}
            />
            <Combobox
              label='Type'
              value={type}
              onChange={(value) => {
                if (onTypeChange) {
                  onTypeChange(value);
                  handlePageChange(1);
                }
              }}
              options={types}
              style={{ width: isDesktop ? '15%' : '100%' }}
            />
            <FreeTextCombobox
              label='Document Name'
              value={keyword}
              onChange={(value) => {
                if (onKeywordChange) {
                  onKeywordChange(value);
                }
                handlePageChange(1);
              }}
              style={{ width: isDesktop ? '15%' : '100%' }}
            />
          </Box>
          {isDesktop ? (
            <TableContainer>
              <Table className='table__notes'>
                <TableHead>
                  <TableRow>
                    <TableCell className='table__header'>Document Name</TableCell>
                    <TableCell className='table__header'>Category</TableCell>
                    <TableCell className='table__header'>Subject</TableCell>
                    <TableCell className='table__header'>Type</TableCell>
                    <TableCell className='table__header'>Uploaded By</TableCell>
                    <TableCell className='table__header'>Uploaded On</TableCell>
                    {/*<TableCell className='table__header' align='center'>*/}
                    {/*  Download*/}
                    {/*</TableCell>*/}
                    {isAdmin && renderAdminActions && (
                      <TableCell className='table__header'>Actions</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notes.map((note: Note) => (
                    <TableRow
                      key={note.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell className='table__content' component='th' scope='row'>
                        <Link
                          href={`${VITE_APP_AWS_S3_BUCKET_URL}/${note.file_name}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          underline='hover'
                          sx={{
                            paddingLeft: '1px',
                            display: 'flex',
                            color: 'var(--text-color)',
                            gap: '3%',
                          }}
                        >
                          <Card>
                            <CardContent className='table__notes-card'>
                              <NotesIcon docSubject={note.doc_subject} />
                            </CardContent>
                          </Card>
                          <div className='table__content1'>{note.document_name}</div>
                        </Link>
                      </TableCell>
                      <TableCell className='table__content'>{note.doc_category?.name}</TableCell>
                      <TableCell className='table__content'>{note.doc_subject?.name}</TableCell>
                      <TableCell className='table__content'>{note.doc_type?.name}</TableCell>
                      <TableCell className='table__content'>{note.account?.username}</TableCell>
                      <TableCell className='table__content'>
                        {formatDate(note.uploaded_on)}
                      </TableCell>
                      {isAdmin && renderAdminActions && (
                        <TableCell className='table__content'>{renderAdminActions(note)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid container mt='3%' spacing={2} sx={{ width: '90%' }}>
              {' '}
              {notes.map((note: Note) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        mb='5%'
                        component='div'
                        fontWeight='bold'
                        style={{
                          height: '3em',
                          overflow: 'hidden',
                        }}
                      >
                        {note.document_name}
                      </Typography>
                      <Typography variant='body2'>Category: {note.doc_category?.name}</Typography>
                      <Typography variant='body2'>Subject: {note.doc_subject?.name}</Typography>
                      <Typography variant='body2'>Type: {note.doc_type?.name}</Typography>
                      <Typography variant='body2'>Uploaded by: {note.account?.username}</Typography>
                      <Typography variant='body2'>
                        Uploaded on: {formatDate(note.uploaded_on)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Link
                        href={`${VITE_APP_AWS_S3_BUCKET_URL}/${note.file_name}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        underline='always'
                      >
                        View PDF
                      </Link>
                    </Box>
                    {isAdmin && renderAdminActions && (
                      <Box
                        sx={{
                          margin: '3%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {renderAdminActions(note)}
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </ThemeProvider>
      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </Box>
  );
};
