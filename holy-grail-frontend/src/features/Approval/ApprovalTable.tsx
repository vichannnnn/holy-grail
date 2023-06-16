import { useState, useEffect, useContext, useCallback } from "react";
import {
  fetchData,
  fetchPendingApprovalNotes,
  CategoryType,
  SubjectType,
  DocumentType,
  PaginatedNotes,
  Note,
} from "../../utils/library/Search";
import approveNote from "../../utils/actions/ApproveNote";
import deleteNote from "../../utils/actions/DeleteNote";
import updateNote from "../../utils/actions/UpdateNote";
import DeleteAlert from "./DeleteAlert";
import EditModal from "./EditModal";
import NotesTable from "../../components/NotesTable/NotesTable";
import AuthContext from "../../providers/AuthProvider";
import AdminApproveIcon from "../../components/AdminApproveIcon/AdminApproveIcon";
import AdminDeleteIcon from "../../components/AdminDeleteIcon/AdminDeleteIcon";
import AdminEditIcon from "../../components/AdminEditIcon/AdminEditIcon";
import { Box } from "@chakra-ui/react";


const ApprovalTable = () => {
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

  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteInitialProperties, setNoteInitialProperties] = useState<Note | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pages: 1,
    size: 20,
    total: 0,
  });

  const [category, setCategory] = useState<number | "">(0);
  const [subject, setSubject] = useState<number | "">(0);
  const [type, setType] = useState<number | "">(0);

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
    });

    fetchPendingApprovalNotes({}).then((fetchPendingApprovalNotes) => {
      setNotes(fetchPendingApprovalNotes);
    });
  }, []);

  const filterNotes = useCallback(() => {
    fetchPendingApprovalNotes({
      category:
        category !== 0
          ? categories.find((c) => c.id === category)?.name
          : undefined,
      subject:
        subject !== 0
          ? subjects.find((s) => s.id === subject)?.name
          : undefined,
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

  useEffect(() => {
    filterNotes();
  }, [filterNotes]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pageInfo.total / pageInfo.size)) {
      setPageInfo({ ...pageInfo, page: newPage });
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveNote(id);
      filterNotes();
    } catch (error) {
      console.error(error);
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

  // const renderNotes = () => {
  //   return notes.items.map((note: Note) => (
  //     <Tr key={note.id}>
  //       <Td>{note.doc_category?.name}</Td>
  //       <Td>{note.doc_subject?.name}</Td>
  //       <Td>{note.doc_type?.name}</Td>
  //       <Td>{note.account?.username}</Td>
  //       <Td>
  //         <a
  //           href={`https://holy-grail-bucket.s3.ap-southeast-1.amazonaws.com/${note.file_name}`}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           View PDF
  //         </a>
  //       </Td>
  //       <Td>
  //         <HStack spacing="20px">
  //           <Button colorScheme="green" onClick={() => handleApprove(note.id)}>
  //             Approve
  //           </Button>
  //           <Button
  //             colorScheme="red"
  //             onClick={() => {
  //               setIsAlertOpen(true);
  //               setNoteId(note.id);
  //             }}
  //           >
  //             Delete
  //           </Button>
  //         </HStack>
  //       </Td>
  //     </Tr>
  //   ));
  // };

  return (
    <>
      <NotesTable
        notes={notes.items}
        categories={categories.map((c) => ({ value: c.id, label: c.name }))}
        subjects={subjects.map((s) => ({ value: s.id, label: s.name }))}
        types={types.map((t) => ({ value: t.id, label: t.name }))}
        category={category !== "" ? Number(category) : ""}
        subject={subject !== "" ? Number(subject) : ""}
        type={type !== "" ? Number(type) : ""}
        onCategoryChange={(newValue) => setCategory(Number(newValue))}
        onSubjectChange={(newValue) => setSubject(Number(newValue))}
        onTypeChange={(newValue) => setType(Number(newValue))}
        pageInfo={pageInfo}
        handlePageChange={handlePageChange}
        isAdmin={Boolean(user?.role && user.role >= 2)}
        renderAdminActions={(note) =>
          user && user.role >= 2 ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <AdminApproveIcon
                handleApprove={handleApprove}
                noteId={note.id}
              />
              <AdminDeleteIcon
                setIsAlertOpen={setIsAlertOpen}
                setNoteId={setNoteId}
                noteId={note.id}
              />
              <AdminEditIcon
                setIsEditOpen={setIsEditOpen}
                setNoteId={setNoteId}
                noteId={note.id}
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
              .catch((err) => console.error(err));
          }
        }}
      />
      
      <EditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onConfirm={(newCategory: number|"", newSubject: number|"", newType:number|"", newDocName:string|"") => {
          
          updateNote(noteId, noteInitialProperties?.uploaded_by, newCategory, newSubject, newType, newDocName)
            .then(() => filterNotes())
            .catch((err) => console.error(err));
          
          
        }}
        categories={categories.map((c) => ({ value: c.id, label: c.name }))}
        subjects={subjects.map((s) => ({ value: s.id, label: s.name }))}
        types={types.map((t) => ({ value: t.id, label: t.name }))}
        
        category={noteInitialProperties ? noteInitialProperties.category : ""}
        subject={noteInitialProperties ? noteInitialProperties.subject : ""}
        type={noteInitialProperties ? noteInitialProperties.type : ""}
        documentName={noteInitialProperties ? noteInitialProperties.document_name : ""}
      />
    </>
  );
};

export default ApprovalTable;
