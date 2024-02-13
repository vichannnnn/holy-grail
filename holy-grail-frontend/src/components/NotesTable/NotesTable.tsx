import { useState, useContext, useRef, SyntheticEvent, KeyboardEvent, MouseEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Note, fetchCategory, SubjectType, fetchAllSubjects, downloadNote } from '@api/library';
import {
  Combobox,
  ComboboxProps,
  FreeTextCombobox,
  FreeTextComboboxProps,
  DownloadIcon,
  DropdownMenuItem,
} from '@components';
import { MediaQueryContext } from '@providers';
import MenuItem from '@mui/material/MenuItem';
import { ExpandMore } from '@mui/icons-material';
import { Pagination } from '../Pagination';
import { NotesIcon } from './NotesIcon';
import './NotesTable.css';

interface NotesTableProps {
  notes: Note[];
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  keyword: FreeTextComboboxProps['value'];
  year: ComboboxProps['value'];
  onCategoryChange: ComboboxProps['onChange'];
  onSubjectChange: ComboboxProps['onChange'];
  onTypeChange: ComboboxProps['onChange'];
  onKeywordChange: FreeTextComboboxProps['onChange'];
  onYearChange: ComboboxProps['onChange'];
  onSortOrderChange: (order: 'asc' | 'desc') => void;
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

const yearOptions = Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2008 + i).map((year) => ({
  id: year,
  name: `${year}`,
}));

export const NotesTable = ({
  notes,
  categories,
  subjects,
  types,
  category,
  subject,
  type,
  keyword,
  year,
  onCategoryChange,
  onSubjectChange,
  onTypeChange,
  onKeywordChange,
  onYearChange,
  onSortOrderChange,
  pageInfo,
  handlePageChange,
  renderAdminActions,
  isAdmin,
}: NotesTableProps) => {
  const { isDesktop } = useContext(MediaQueryContext);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  async function handleDownloadNote(event: MouseEvent<HTMLAnchorElement>, note: Note) {
    event.preventDefault();
    await downloadNote(note);
  }

  return (
    <Box>
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
                const subjects = await fetchAllSubjects(categoryData.id);
                setSubjectsData(
                  subjects.map((subject: SubjectType) => ({
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
              }
              handlePageChange(1);
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
              }
              handlePageChange(1);
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
          <Combobox
            label='Year'
            value={year}
            onChange={(value) => {
              if (onYearChange) {
                onYearChange(value);
              }
              handlePageChange(1);
            }}
            options={yearOptions}
            style={{ width: isDesktop ? '15%' : '100%' }}
          />
        </Box>
        {isDesktop ? (
          <TableContainer>
            <Table className='table-notes'>
              <TableHead>
                <TableRow>
                  <TableCell className='table-header'>Document Name</TableCell>
                  <TableCell className='table-header'>Category</TableCell>
                  <TableCell className='table-header'>Subject</TableCell>
                  <TableCell className='table-header'>Type</TableCell>
                  <TableCell className='table-header'>Uploaded By</TableCell>
                  <TableCell className='table-header'>Year</TableCell>
                  <TableCell className='table-header'>
                    <Box display='flex' alignItems='center'>
                      Uploaded On
                      <Box
                        display='flex'
                        alignItems='center'
                        ref={anchorRef}
                        sx={{ cursor: 'pointer', marginLeft: '10px' }}
                        onClick={handleToggle}
                      >
                        <ExpandMore />
                      </Box>
                    </Box>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement='bottom-end'
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom-end' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id='composition-menu'
                                aria-labelledby='composition-button'
                                onKeyDown={handleListKeyDown}
                              >
                                <DropdownMenuItem disabled>Sort By</DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(event) => {
                                    onSortOrderChange('asc');
                                    handleClose(event);
                                  }}
                                >
                                  Ascending
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(event) => {
                                    onSortOrderChange('desc');
                                    handleClose(event);
                                  }}
                                >
                                  Descending
                                </DropdownMenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </TableCell>
                  <TableCell className='table-header'>Download</TableCell>
                  {isAdmin && renderAdminActions && (
                    <TableCell className='table-header'>Actions</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note: Note) => (
                  <TableRow
                    key={note.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className='table-content' component='th' scope='row'>
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
                        <NotesIcon docSubject={note.doc_subject} />
                        <div className='table-document-name'>{note.document_name}</div>
                      </Link>
                    </TableCell>
                    <TableCell className='table-content'>{note.doc_category?.name}</TableCell>
                    <TableCell className='table-content'>{note.doc_subject?.name}</TableCell>
                    <TableCell className='table-content'>{note.doc_type?.name}</TableCell>
                    <TableCell className='table-content'>{note.account?.username}</TableCell>
                    <TableCell className='table-content'>
                      {note.year ? note.year : 'None'}
                    </TableCell>
                    <TableCell className='table-content'>{formatDate(note.uploaded_on)}</TableCell>
                    <TableCell>
                      <DownloadIcon handleDownloadNote={handleDownloadNote} note={note} />
                    </TableCell>
                    {isAdmin && renderAdminActions && (
                      <TableCell className='table-content'>{renderAdminActions(note)}</TableCell>
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
                      View Document
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

      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </Box>
  );
};
