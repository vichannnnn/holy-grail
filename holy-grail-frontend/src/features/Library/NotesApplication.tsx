import { useCallback, useContext, useEffect, useState } from 'react';
import {
  CategoryType,
  DocumentType,
  fetchApprovedNotes,
  fetchData,
  Note,
  PaginatedNotes,
  SubjectType,
} from '@api/library';
import { deleteNote, updateNote } from '@api/actions';
import { AdminActions, NotesTable } from '@components';
import { AuthContext } from '@providers';
import { DeleteAlert, ApprovalEditModal } from '../Approval';
import './library.css';

export const NotesApplication = () => {
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
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 1,
    size: 10,
    total: 0,
  });

  const [category, setCategory] = useState<number | ''>(0);
  const [subject, setSubject] = useState<number | ''>(0);
  const [type, setType] = useState<number | ''>(0);
  const [keyword, setKeyword] = useState<string | ''>('');

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
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
    }).then((response) => {
      setNotes(response);
      setPageInfo({
        page: response.page,
        pages: response.pages,
        size: response.size,
        total: response.total,
      });
    });
  }, [category, subject, type, keyword, pageInfo.page, pageInfo.size, categories, subjects, types]);

  useEffect(() => {
    if (categories.length && subjects.length && types.length) {
      filterNotes();
    }
  }, [filterNotes, category, subject, type, keyword, pageInfo.page, pageInfo.size]);

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

  return (
    <section className='materials container'>
      <NotesTable
        notes={notes.items}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        types={types.map((t) => ({ id: t.id, name: t.name }))}
        category={category !== '' ? Number(category) : ''}
        subject={subject !== '' ? Number(subject) : ''}
        type={type !== '' ? Number(type) : ''}
        keyword={keyword !== '' ? String(keyword) : ''}
        onCategoryChange={handleCategoryChange}
        onSubjectChange={handleSubjectChange}
        onTypeChange={handleTypeChange}
        onKeywordChange={handleKeywordChange}
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
        isAdmin={Boolean(user?.role && user.role >= 2)}
        renderAdminActions={(note) =>
          user && user.role >= 2 ? (
            <AdminActions
              displayApprove={false}
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
      <DeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          if (noteId !== null) {
            handleDelete(noteId).then(() => null);
          }
        }}
      />
      <ApprovalEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onConfirm={(
          newCategory: number | '',
          newSubject: number | '',
          newType: number | '',
          newDocName: string | '',
        ) => {
          updateNote(
            noteId,
            noteInitialProperties?.uploaded_by,
            newCategory,
            newSubject,
            newType,
            newDocName,
          ).then(() => filterNotes());
        }}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        subjects={subjects.map((s) => ({ id: s.id, name: s.name }))}
        types={types.map((t) => ({ id: t.id, name: t.name }))}
        category={noteInitialProperties ? noteInitialProperties.category : ''}
        subject={noteInitialProperties ? noteInitialProperties.subject : ''}
        type={noteInitialProperties ? noteInitialProperties.type : ''}
        documentName={noteInitialProperties ? noteInitialProperties.document_name : ''}
      />
    </section>
  );
};
