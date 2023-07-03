<<<<<<< HEAD
import { Box } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
=======
import { Flex } from "@chakra-ui/react";
import { UploadButton } from "./UploadButton";
import { Text } from "../../components/Text/Text";
import { Title } from "../../components/Title/Title";
import {useCallback, useContext, useEffect, useState} from "react";
>>>>>>> bbe493b (new FE (desktop))
import {
  CategoryType,
  DocumentType,
  fetchApprovedNotes,
  fetchData,
  PaginatedNotes,
<<<<<<< HEAD
  SubjectType,
  Note,
} from '../../api/utils/library/Search';
import AuthContext from '../../providers/AuthProvider';
import deleteNote from '../../api/utils/actions/DeleteNote';
import updateNote from '../../api/utils/actions/UpdateNote';
import NotesTable from '../../components/NotesTable/NotesTable';
import AdminDeleteIcon from '../../components/AdminDeleteIcon/AdminDeleteIcon';
import DeleteAlert from '../Approval/DeleteAlert';
import './library.css';
import EditModal from '../Approval/EditModal';
import AdminEditIcon from '../../components/AdminEditIcon/AdminEditIcon';
=======
  SubjectType
} from "../../utils/library/Search";
import AuthContext from "../../providers/AuthProvider";
import deleteNote from "../../utils/actions/DeleteNote";
import NotesTable from "../../components/NotesTable/NotesTable";
import AdminDeleteIcon from "../../components/AdminDeleteIcon/AdminDeleteIcon";
import DeleteAlert from "../Approval/DeleteAlert";
import "./library.css"
>>>>>>> bbe493b (new FE (desktop))

const MaterialsGrid = () => {
  const [notes, setNotes] = useState<PaginatedNotes>({
    items: [],
    page: 0,
    pages: 0,
    size: 0,
    total: 0,
  });
  const { user } = useContext(AuthContext);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
<<<<<<< HEAD
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<number>(0);

  const [noteInitialProperties, setNoteInitialProperties] = useState<Note | null>(null);
=======
  const [noteId, setNoteId] = useState<number | null>(null);

>>>>>>> bbe493b (new FE (desktop))
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 1,
<<<<<<< HEAD
    size: 10,
    total: 0,
  });

  const [category, setCategory] = useState<number | ''>(0);
  const [subject, setSubject] = useState<number | ''>(0);
  const [type, setType] = useState<number | ''>(0);
=======
    size: 20,
    total: 0,
  });

  const [category, setCategory] = useState<number | "">(0);
  const [subject, setSubject] = useState<number | "">(0);
  const [type, setType] = useState<number | "">(0);
>>>>>>> bbe493b (new FE (desktop))

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
    });

    fetchApprovedNotes({}).then((fetchApprovedNotes) => {
      setNotes(fetchApprovedNotes);
    });
  }, []);

  const filterNotes = useCallback(() => {
    fetchApprovedNotes({
<<<<<<< HEAD
      category: category !== 0 ? categories.find((c) => c.id === category)?.name : undefined,
      subject: subject !== 0 ? subjects.find((s) => s.id === subject)?.name : undefined,
=======
      category:
          category !== 0
              ? categories.find((c) => c.id === category)?.name
              : undefined,
      subject:
          subject !== 0
              ? subjects.find((s) => s.id === subject)?.name
              : undefined,
>>>>>>> bbe493b (new FE (desktop))
      doc_type: type !== 0 ? types.find((t) => t.id === type)?.name : undefined,
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
<<<<<<< HEAD
  }, [category, subject, type, pageInfo.page, pageInfo.size, categories, subjects, types]);
=======
  }, [
    category,
    subject,
    type,
    pageInfo.page,
    pageInfo.size,
    categories,
    subjects,
    types,
  ]);
>>>>>>> bbe493b (new FE (desktop))

  useEffect(() => {
    filterNotes();
  }, [filterNotes]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pageInfo.total / pageInfo.size)) {
      setPageInfo({ ...pageInfo, page: newPage });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setIsAlertOpen(false);
      filterNotes();
    } catch (error) {
      console.error(error);
    }
  };

<<<<<<< HEAD
  const handleCategoryChange = (newValue: number | '') => {
=======
  const handleCategoryChange = (newValue: number | "") => {
>>>>>>> bbe493b (new FE (desktop))
    setCategory(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

<<<<<<< HEAD
  const handleSubjectChange = (newValue: number | '') => {
=======
  const handleSubjectChange = (newValue: number | "") => {
>>>>>>> bbe493b (new FE (desktop))
    setSubject(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

<<<<<<< HEAD
  const handleTypeChange = (newValue: number | '') => {
=======
  const handleTypeChange = (newValue: number | "") => {
>>>>>>> bbe493b (new FE (desktop))
    setType(Number(newValue));
    setPageInfo({ ...pageInfo, page: 1 });
  };

  // const renderNotes = () => {
  //   return notes.items.map((note: Note) => (
  //     <TableRow key={note.id}>
  //       <TableCell>{note.doc_category?.name}</TableCell>
  //       <TableCell>{note.doc_subject?.name}</TableCell>
  //       <TableCell>{note.doc_type?.name}</TableCell>
  //       <TableCell>{note.account?.username}</TableCell>
  //       <TableCell>
  //         <a
  //           href={`https://holy-grail-bucket.s3.ap-southeast-1.amazonaws.com/${note.file_name}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           View PDF
  //         </a>
  //       </TableCell>
  //     </TableRow>
  //   ));
  // };

  return (
<<<<<<< HEAD
    <section className='materials container'>
      <NotesTable
        notes={notes.items}
        categories={categories.map((c) => ({ value: c.id, label: c.name }))}
        subjects={subjects.map((s) => ({ value: s.id, label: s.name }))}
        types={types.map((t) => ({ value: t.id, label: t.name }))}
        category={category !== '' ? Number(category) : ''}
        subject={subject !== '' ? Number(subject) : ''}
        type={type !== '' ? Number(type) : ''}
        onCategoryChange={handleCategoryChange}
        onSubjectChange={handleSubjectChange}
        onTypeChange={handleTypeChange}
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
        isAdmin={Boolean(user?.role && user.role >= 2)}
        renderAdminActions={(note) =>
          user && user.role >= 2 ? (
            <Box sx={{ display: 'flex' }}>
              <AdminDeleteIcon
                setIsAlertOpen={setIsAlertOpen}
                setNoteId={setNoteId}
                noteId={note.id}
              />
              <AdminEditIcon
                noteId={note.id}
                setIsEditOpen={setIsEditOpen}
                setNoteId={setNoteId}
                noteProperties={note}
                setNoteProperties={setNoteInitialProperties}
              />
            </Box>
          ) : null
        }
      />
      <DeleteAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          if (noteId !== null) {
            handleDelete(noteId)
              .then(() => null)
              .catch((err) => {});
          }
        }}
      />
      <EditModal
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
          )
            .then(() => filterNotes())
            .catch((err) => {});
        }}
        categories={categories.map((c) => ({ value: c.id, label: c.name }))}
        subjects={subjects.map((s) => ({ value: s.id, label: s.name }))}
        types={types.map((t) => ({ value: t.id, label: t.name }))}
        category={noteInitialProperties ? noteInitialProperties.category : ''}
        subject={noteInitialProperties ? noteInitialProperties.subject : ''}
        type={noteInitialProperties ? noteInitialProperties.type : ''}
        documentName={noteInitialProperties ? noteInitialProperties.document_name : ''}
      />
    </section>
=======
      <section className="materials container">
        <NotesTable
            notes={notes.items}
            categories={categories.map((c) => ({ value: c.id, label: c.name }))}
            subjects={subjects.map((s) => ({ value: s.id, label: s.name }))}
            types={types.map((t) => ({ value: t.id, label: t.name }))}
            category={category !== "" ? Number(category) : ""}
            subject={subject !== "" ? Number(subject) : ""}
            type={type !== "" ? Number(type) : ""}
            onCategoryChange={handleCategoryChange}
            onSubjectChange={handleSubjectChange}
            onTypeChange={handleTypeChange}
            pageInfo={pageInfo}
            handlePageChange={handlePageChange}
            isAdmin={Boolean(user?.role && user.role >= 2)}
            renderAdminActions={(note) =>
                user && user.role >= 2 ? (
                    <AdminDeleteIcon
                        setIsAlertOpen={setIsAlertOpen}
                        setNoteId={setNoteId}
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
                handleDelete(noteId)
                    .then(() => null)
                    .catch((err) => console.error(err));
              }
            }}
        />
      </section>
>>>>>>> bbe493b (new FE (desktop))
  );
};

export default MaterialsGrid;
