'use client';

import { ReactElement, useContext } from 'react';

import { Note, SubjectType, fetchAllSubjects, fetchCategory } from '@api/library';

import {
  Combobox,
  ComboboxProps,
  FreeTextCombobox,
  FreeTextComboboxProps,
} from '@components/Combobox';

import { DesktopNotesTable } from '@features/Library/DesktopNotesTable';
import { MobileNotesTable } from '@features/Library/MobileNotesTable';

import { MediaQueryContext } from '@providers/MediaQueryProvider';

export const NEXT_PUBLIC_AWS_CLOUDFRONT_URL = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL;

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const yearOptions = Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2008 + i).map(
  (year) => ({
    id: year,
    name: `${year}`,
  }),
);

export interface BaseNotesTableProps {
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
  renderAdminActions?: (note: Note) => ReactElement | null;
  isAdmin?: boolean;
}

export interface FilterBarProps {
  categories: ComboboxProps['options'];
  subjects: ComboboxProps['options'];
  types: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  keyword: FreeTextComboboxProps['value'];
  year: ComboboxProps['value'];
  onCategoryChange: (value: any) => void;
  onSubjectChange: ComboboxProps['onChange'];
  onTypeChange: ComboboxProps['onChange'];
  onKeywordChange: FreeTextComboboxProps['onChange'];
  onYearChange: ComboboxProps['onChange'];
  handlePageChange: (page: number) => void;
  isCategorySelected: boolean;
  setIsCategorySelected: (value: boolean) => void;
  subjectsData: { id: number; name: string }[];
  setSubjectsData: (data: { id: number; name: string }[]) => void;
}

export const FilterBar = ({
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
  handlePageChange,
  isCategorySelected,
  setIsCategorySelected,
  subjectsData,
  setSubjectsData,
}: FilterBarProps) => {
  return (
    <div className='w-full flex flex-col md:flex-row gap-1 mb-1 items-center'>
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
        className='w-full md:w-1/5'
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
        className={`w-full md:w-1/5 ${isCategorySelected ? 'opacity-100' : 'opacity-50'}`}
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
        className='w-full md:w-1/5'
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
        className='w-full md:w-1/5'
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
        className='w-full md:w-1/5'
      />
    </div>
  );
};

export const NotesTable = (props: BaseNotesTableProps) => {
  const { isMedium } = useContext(MediaQueryContext);
  return isMedium ? <DesktopNotesTable {...props} /> : <MobileNotesTable {...props} />;
};
