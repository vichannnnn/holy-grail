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
                      onChange={onCategoryChange}
                      options={categories}
                    />
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Combobox
                      label="Subject"
                      value={subject}
                      onChange={onSubjectChange}
                      options={subjects}
                    />
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <Combobox
                      label="Type"
                      value={type}
                      onChange={onTypeChange}
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
                  <TableCell>Uploaded by</TableCell>
                  <TableCell>File</TableCell>
                  {renderAdditionalColumn && <TableCell>Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((note: Note) => (
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
