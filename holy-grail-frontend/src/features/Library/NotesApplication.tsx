import { useState, useEffect } from "react";

import {
  fetchData,
  fetchApprovedNotes,
  CategoryType,
  SubjectType,
  DocumentType,
  PaginatedNotes,
} from "../../utils/library/Search";

import NotesTable from "../../components/NotesTable/NotesTable";

const NotesApplication = () => {
  const [notes, setNotes] = useState<PaginatedNotes>({
    items: [],
    page: 0,
    pages: 0,
    size: 0,
    total: 0,
  });
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 3, total: 0 });

  const [category, setCategory] = useState<number | "">(0);
  const [subject, setSubject] = useState<number | "">(0);
  const [type, setType] = useState<number | "">(0);

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

  const filterNotes = () => {
    fetchApprovedNotes({
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
        size: response.size,
        total: response.total,
      });
    });
  };

  useEffect(() => {
    filterNotes();
  }, [category, subject, type, pageInfo.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(pageInfo.total / pageInfo.size)) {
      setPageInfo({ ...pageInfo, page: newPage });
    }
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
      />
    </>
  );
};

export default NotesApplication;
