import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import { KeyboardEvent, MouseEvent, SyntheticEvent, useRef, useState } from 'react';

import { Note, downloadNote } from '@api/library';

import { DropdownMenuItem } from '@components/DropdownMenuItem';

import { DownloadIcon, NotesIcon } from '@features/Library/Icon';
import {
  BaseNotesTableProps,
  FilterBar,
  NEXT_PUBLIC_AWS_CLOUDFRONT_URL,
  formatDate,
} from '@features/Library/NotesTable';
import { Pagination } from '@features/Library/Pagination';

export const DesktopNotesTable = (props: BaseNotesTableProps) => {
  const {
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
  } = props;

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

  const getDocumentUrl = (fileName: string) => {
    return `${NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${fileName}`;
  };

  return (
    <div>
      <div className='flex flex-col items-center'>
        <FilterBar
          categories={categories}
          subjects={subjects}
          types={types}
          category={category}
          subject={subject}
          type={type}
          keyword={keyword}
          year={year}
          onCategoryChange={onCategoryChange}
          onSubjectChange={onSubjectChange}
          onTypeChange={onTypeChange}
          onKeywordChange={onKeywordChange}
          onYearChange={onYearChange}
          handlePageChange={handlePageChange}
          isCategorySelected={isCategorySelected}
          setIsCategorySelected={setIsCategorySelected}
          subjectsData={subjectsData}
          setSubjectsData={setSubjectsData}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <p>Document Name</p>
                </TableCell>
                <TableCell>
                  <p>Category</p>
                </TableCell>
                <TableCell>
                  <p>Subject</p>
                </TableCell>
                <TableCell>
                  <p>Type</p>
                </TableCell>
                <TableCell>
                  <p>Uploaded By</p>
                </TableCell>
                <TableCell>
                  <p>Year</p>
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    <p>Uploaded On</p>
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
                <TableCell>
                  <p>Download</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note: Note) => (
                <TableRow key={note.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <Link
                      href={getDocumentUrl(note.file_name)}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <p>
                        <NotesIcon docSubject={note.doc_subject} />{' '}
                        {note.document_name.length > 30
                          ? `${note.document_name.substring(0, 30)}...`
                          : note.document_name}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p>{note.doc_category?.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{note.doc_subject?.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{note.doc_type?.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{note.account?.username}</p>
                  </TableCell>
                  <TableCell>
                    <p>{note.year ? note.year : 'None'}</p>
                  </TableCell>
                  <TableCell>
                    <p>{formatDate(note.uploaded_on)}</p>
                  </TableCell>
                  <TableCell>
                    <DownloadIcon handleDownloadNote={handleDownloadNote} note={note} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </div>
  );
};
