import { useCallback, useContext, useEffect, useState } from 'react';
import {
  CategoryType,
  CommonType,
  DocumentType,
  fetchLibraryTypes,
  fetchPendingApprovalNotes,
  Note,
  PaginatedNotes,
  SubjectType,
} from '@api/library';
import { approveNote, deleteNote, updateNote } from '@api/actions';
import { AdminActions, DeleteNoteModal, UpdateNoteModal, NotesTable } from '@components';
import { AuthContext } from '@providers';

export const ApprovalTable = () => {
  const [notes, setNotes] = useState<PaginatedNotes>({
    items: [],
    page: 0,
    pages: 0,
    size: 0,
    total: 0,
  });
  const { user } = useContext(AuthContext);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
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
    size: 20,
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

    fetchPendingApprovalNotes({}).then((fetchPendingApprovalNotes) => {
      setNotes(fetchPendingApprovalNotes);
    });
  }, []);

  const filterNotes = useCallback(() => {
    fetchPendingApprovalNotes({
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
    filterNotes();
  }, [filterNotes]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pageInfo.total / pageInfo.size)) {
      setPageInfo({ ...pageInfo, page: newPage });
    }
  };

  const handleApprove = async (id: number) => {
    await approveNote(id);
    filterNotes();
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setIsAlertOpen(false);
    filterNotes();
  };

  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <NotesTable
        notes={notes.items}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        types={types.map((t) => ({ id: t.id, name: t.name }))}
        category={category !== '' ? Number(category) : ''}
        subject={subject !== '' ? Number(subject) : ''}
        type={type !== '' ? Number(type) : ''}
        year={year !== 0 ? Number(year) : ''}
        keyword={keyword !== '' ? String(keyword) : ''}
        onCategoryChange={(newValue) => setCategory(Number(newValue))}
        onSubjectChange={(newValue) => setSubject(Number(newValue))}
        onTypeChange={(newValue) => setType(Number(newValue))}
        onKeywordChange={(newValue) => setKeyword(String(newValue))}
        onYearChange={(newValue) => setYear(Number(newValue))}
        onSortOrderChange={handleSortOrderChange}
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
        isAdmin={Boolean(user?.role && user.role >= 2)}
        renderAdminActions={(note) =>
          user && user.role >= 2 ? (
            <AdminActions
              handleApprove={handleApprove}
              setIsAlertOpen={setIsAlertOpen}
              setNoteId={setNoteId}
              setIsEditOpen={setIsEditOpen}
              noteProperties={note}
              setNoteProperties={setNoteInitialProperties}
              noteId={note.id}
            />
          ) : null
        }
      />
      <DeleteNoteModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          if (noteId !== null) {
            handleDelete(noteId).then(() => null);
          }
        }}
      />

      <UpdateNoteModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onConfirm={(
          newCategory: number | '',
          newSubject: number | '',
          newType: number | '',
          newDocName: string | '',
          newYear: number | '',
        ) => {
          updateNote(
            noteId,
            noteInitialProperties?.uploaded_by,
            newCategory,
            newSubject,
            newType,
            newDocName,
            newYear,
          ).then(() => filterNotes());
        }}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        types={types.map((t) => ({ id: t.id, name: t.name }))}
        years={years.map((y) => ({ id: y.id, name: y.name }))}
        category={noteInitialProperties ? noteInitialProperties.category : ''}
        subject={noteInitialProperties ? noteInitialProperties.subject : ''}
        type={noteInitialProperties ? noteInitialProperties.type : ''}
        year={noteInitialProperties ? noteInitialProperties.year : ''}
        documentName={noteInitialProperties ? noteInitialProperties.document_name : ''}
      />
    </>
  );
};
