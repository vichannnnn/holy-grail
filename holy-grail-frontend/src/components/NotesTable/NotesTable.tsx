import { Box, Card, CardContent, Grid, Typography, Link } from "@mui/material";
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
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (page: number) => void;
  renderAdminActions?: (note: Note) => JSX.Element | null;
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
  renderAdminActions,
  isAdmin,
}: NotesTableProps) => {
  const muiTheme = createTheme();

  return (
    <Box>
      <ThemeProvider theme={muiTheme}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box
            display="flex"
            justifyContent="space-around"
            marginBottom={2}
            sx={{ width: "80%" }}
          >
            <Combobox
              label="Category"
              value={category}
              onChange={(value) => {
                onCategoryChange(value);
                handlePageChange(1);
              }}
              options={categories}
              style={{ width: "30%" }}
            />
            <Combobox
              label="Subject"
              value={subject}
              onChange={(value) => {
                onSubjectChange(value);
                handlePageChange(1);
              }}
              options={subjects}
              style={{ width: "30%" }}
            />
            <Combobox
              label="Type"
              value={type}
              onChange={(value) => {
                onTypeChange(value);
                handlePageChange(1);
              }}
              options={types}
              style={{ width: "30%" }}
            />
          </Box>
          <Grid container mt="3%" spacing={2} sx={{ width: "80%" }}>
            {" "}
            {notes.map((note: Note) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {isAdmin && renderAdminActions && (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "5px",
                        top: "10px",
                      }}
                    >
                      {renderAdminActions(note)}
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      mb="10%"
                      component="div"
                      fontWeight="bold"
                      style={{
                        height: "3em",
                        overflow: "hidden",
                      }}
                    >
                      {note.document_name}
                    </Typography>
                    <Typography variant="body2">
                      Category: {note.doc_category?.name}
                    </Typography>
                    <Typography variant="body2">
                      Subject: {note.doc_subject?.name}
                    </Typography>
                    <Typography variant="body2">
                      Type: {note.doc_type?.name}
                    </Typography>
                    <Typography variant="body2">
                      Uploaded by: {note.account?.username}
                    </Typography>
                    <Typography variant="body2">
                      Uploaded on: {formatDate(note.uploaded_on)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Link
                      href={`${VITE_APP_AWS_S3_BUCKET_URL}/${note.file_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="always"
                    >
                      View PDF
                    </Link>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
      <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
    </Box>
  );
};

export default NotesTable;
