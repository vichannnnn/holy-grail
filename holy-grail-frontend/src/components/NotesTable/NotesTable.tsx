import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Note } from "../../utils/library/Search";
import Combobox from "../../features/Library/Combobox";
import { ComboboxProps } from "../../features/Library/Combobox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Pagination } from "../Pagination/Pagination";
interface NotesTableProps {
  notes: Note[];
  categories: ComboboxProps["options"];
  subjects: ComboboxProps["options"];
  types: ComboboxProps["options"];
  category: ComboboxProps["value"];
  subject: ComboboxProps["value"];
  type: ComboboxProps["value"];
  onCategoryChange: ComboboxProps["onChange"];
  onSubjectChange: ComboboxProps["onChange"];
  onTypeChange: ComboboxProps["onChange"];
  pageInfo: { page: number; size: number; total: number };
  handlePageChange: (page: number) => void;
  renderAdditionalColumn?: (note: Note) => JSX.Element | null;
  isAdmin?: boolean;
}

const VITE_APP_AWS_S3_BUCKET_URL = import.meta.env.VITE_APP_AWS_S3_BUCKET_URL;

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
}

const NotesTable = ({
  notes,
  categories,
  subjects,
  types,
  category,
  subject,
  type,
  onCategoryChange,
  onSubjectChange,
  onTypeChange,
  pageInfo,
  handlePageChange,
  renderAdditionalColumn,
  isAdmin,
}: NotesTableProps) => {
  const muiTheme = createTheme();

  return (
    <Box>
      <ThemeProvider theme={muiTheme}>
        <Box display="flex" justifyContent="center">
          <TableContainer sx={{ maxWidth: "80%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Combobox
                      label="Category"
                      value={category}
                      onChange={value => {
                        onCategoryChange(value);
                        handlePageChange(1);
                      }}
                      options={categories}
                    />
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Combobox
                      label="Subject"
                      value={subject}
                      onChange={value => {
                        onSubjectChange(value);
                        handlePageChange(1);
                      }}
                      options={subjects}
                    />
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Combobox
                      label="Type"
                      value={type}
                      onChange={value => {
                        onTypeChange(value);
                        handlePageChange(1);
                      }}
                      options={types}
                    />
                  </TableCell>
                  {renderAdditionalColumn && (
                    <TableCell style={{ borderBottom: "none" }}></TableCell>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Uploaded by</TableCell>
                  <TableCell>Uploaded on</TableCell>
                  <TableCell>File</TableCell>
                  {isAdmin && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note: Note) => (
                  <TableRow key={note.id}>
                    <TableCell>{note.doc_category?.name}</TableCell>
                    <TableCell>{note.doc_subject?.name}</TableCell>
                    <TableCell>{note.doc_type?.name}</TableCell>
                    <TableCell>{note.document_name}</TableCell>
                    <TableCell>{note.account?.username}</TableCell>
                    <TableCell>{formatDate(note.uploaded_on)}</TableCell>
                    <TableCell>
                      <a
                        href={`${VITE_APP_AWS_S3_BUCKET_URL}/${note.file_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </a>
                    </TableCell>
                    <TableCell>
                      {renderAdditionalColumn && renderAdditionalColumn(note)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ThemeProvider>
      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </Box>
  );
};

export default NotesTable;
