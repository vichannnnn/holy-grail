import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Combobox from "./Combobox";
import {
  Note,
  fetchData,
  fetchApprovedNotes,
  CategoryType,
  SubjectType,
  DocumentType,
  PaginatedNotes,
} from "../../utils/library/Search";
import { Pagination } from "../../components/Pagination/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const muiTheme = createTheme();

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

  const renderNotes = () => {
    return notes.items.map((note: Note) => (
      <TableRow key={note.id}>
        <TableCell>{note.doc_category?.name}</TableCell>
        <TableCell>{note.doc_subject?.name}</TableCell>
        <TableCell>{note.doc_type?.name}</TableCell>
        <TableCell>{note.account?.username}</TableCell>
        <TableCell>
          <a
            href={`https://holy-grail-bucket.s3.ap-southeast-1.amazonaws.com/${note.file_name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box>
        <Box display="flex" justifyContent="center">
          <TableContainer sx={{ maxWidth: "80%" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Combobox
                      label="Category"
                      value={category !== "" ? Number(category) : ""}
                      onChange={(newValue) => setCategory(Number(newValue))}
                      options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                    />
                  </TableCell>
                  <TableCell>
                    <Combobox
                      label="Subject"
                      value={subject !== "" ? Number(subject) : ""}
                      onChange={(newValue) => setSubject(Number(newValue))}
                      options={subjects.map((subject) => ({
                        value: subject.id,
                        label: subject.name,
                      }))}
                    />
                  </TableCell>
                  <TableCell>
                    <Combobox
                      label="Type"
                      value={type !== "" ? Number(type) : ""}
                      onChange={(newValue) => setType(Number(newValue))}
                      options={types.map((type) => ({
                        value: type.id,
                        label: type.name,
                      }))}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Uploaded by</TableCell>
                  <TableCell>File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderNotes()}</TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
      </Box>
    </ThemeProvider>
  );
};

export default NotesApplication;
