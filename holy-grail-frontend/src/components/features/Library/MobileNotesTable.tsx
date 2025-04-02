import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { Note } from '@api/library';

import {
  BaseNotesTableProps,
  FilterBar,
  NEXT_PUBLIC_AWS_CLOUDFRONT_URL,
  formatDate,
} from '@features/Library/NotesTable';
import { Pagination } from '@features/Library/Pagination';

export const MobileNotesTable = (props: BaseNotesTableProps) => {
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
    pageInfo,
    handlePageChange,
  } = props;

  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);

  const getDocumentUrl = (fileName: string) => {
    return `${NEXT_PUBLIC_AWS_CLOUDFRONT_URL}/${fileName}`;
  };

  return (
    <Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
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
        <Grid container mt='3%' spacing={2} sx={{ width: '90%' }}>
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
                    href={getDocumentUrl(note.file_name)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View Document
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </Box>
  );
};
