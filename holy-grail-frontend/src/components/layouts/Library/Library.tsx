'use client';

import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';

import { deleteNote } from '@api/actions';
import {
  CategoryType,
  CommonType,
  DocumentType,
  Note,
  PaginatedNotes,
  SubjectType,
  fetchApprovedNotes,
  fetchLibraryTypes,
} from '@api/library';

import { Divider } from '@components/Divider';
import { Showcase } from '@components/Showcase';

import { NotesTable } from '@features/Library';

import { AuthContext } from '@providers/AuthProvider';
import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const Library = () => {
  const { isMedium } = useContext(MediaQueryContext);
  const [notes, setNotes] = useState<PaginatedNotes>({
    items: [],
    page: 0,
    pages: 0,
    size: 0,
    total: 0,
  });
  const { user } = useContext(AuthContext);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number>(0);

  const [noteInitialProperties, setNoteInitialProperties] = useState<Note | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [years, setYears] = useState<CommonType[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 1,
    size: 10,
    total: 0,
  });

  const [category, setCategory] = useState<number | ''>(0);
  const [subject, setSubject] = useState<number | ''>(0);
  const [type, setType] = useState<number | ''>(0);
  const [year, setYear] = useState<number | ''>(0);
  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchLibraryTypes().then(({ categories, subjects, types, years }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
      setYears(years);
    });
  }, []);

  const filterNotes = useCallback(() => {
    fetchApprovedNotes({
      category: category !== 0 ? categories.find((c) => c.id === category)?.name : undefined,
      subject: subject !== 0 ? subjects.find((s) => s.id === subject)?.name : undefined,
      doc_type: type !== 0 ? types.find((t) => t.id === type)?.name : undefined,
      keyword: keyword !== '' ? keyword : '',
      page: pageInfo.page,
      size: pageInfo.size,
      sorted_by_upload_date: sortOrder,
      year: Number(year),
    }).then((response) => {
      setNotes(response);
      setPageInfo({
        page: response.page,
        pages: response.pages,
        size: response.size,
        total: response.total,
      });
    });
  }, [
    category,
    subject,
    type,
    keyword,
    year,
    pageInfo.page,
    pageInfo.size,
    sortOrder,
    categories,
    subjects,
    types,
  ]);

  useEffect(() => {
    if (categories.length && subjects.length && types.length) {
      filterNotes();
    }
  }, [filterNotes, category, subject, type, keyword, year]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pageInfo.total / pageInfo.size)) {
      setPageInfo({ ...pageInfo, page: newPage });
    }
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setIsAlertOpen(false);
    filterNotes();
  };

  const handleCategoryChange = (newValue: number | '') => {
    setCategory(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

  const handleSubjectChange = (newValue: number | '') => {
    setSubject(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

  const handleTypeChange = (newValue: number | '') => {
    setType(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

  const handleKeywordChange = (newValue: string | '') => {
    setKeyword(String(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

  const handleYearChange = (newValue: number | '') => {
    setYear(newValue);
    setPageInfo({ ...pageInfo, page: 1 });
  };

  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
  };

  return (
    <div className='w-4/5 flex flex-col gap-2'>
      <h2 className='font-bold'>
        Hello,{' '}
        {user ? `${user.username}, welcome back to the Holy Grail` : 'welcome to the Holy Grail'}
      </h2>
      <h4>A central repository for your revision materials, consolidated into a library.</h4>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
      <h2 className='font-bold'>Library</h2>
      <p>
        View materials or contribute{' '}
        <Link href='/upload' passHref>
          here
        </Link>{' '}
        after you have logged in (subjected to approval of administrators).
      </p>
      <p>
        Are you a tuition centre or freelance tutor looking to expand your reach?
        <br />
        We have one of the largest student-focused audiences in Singapore.
        <br />
        Interested sponsors and advertisers, please contact us at <strong>grail@himaa.me</strong> to
        explore partnership opportunities.
      </p>
      <Showcase />
      <NotesTable
        notes={notes.items}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        types={types.map((t) => ({ id: t.id, name: t.name }))}
        category={category !== '' ? Number(category) : ''}
        subject={subject !== '' ? Number(subject) : ''}
        type={type !== '' ? Number(type) : ''}
        keyword={keyword !== '' ? String(keyword) : ''}
        year={year !== 0 ? Number(year) : ''}
        onCategoryChange={handleCategoryChange}
        onSubjectChange={handleSubjectChange}
        onTypeChange={handleTypeChange}
        onKeywordChange={handleKeywordChange}
        onYearChange={handleYearChange}
        onSortOrderChange={handleSortOrderChange}
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
