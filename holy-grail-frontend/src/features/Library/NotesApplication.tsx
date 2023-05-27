import { useState, useEffect } from "react";
import {
  Text,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  HStack,
  Button,
  TableContainer,
  Box,
} from "@chakra-ui/react";
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
  const [pageInfo, setPageInfo] = useState({ page: 1, size: 20, total: 0 });

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

  const renderNotes = () => {
    return notes.items.map((note: Note) => (
      <Tr key={note.id}>
        <Td>{note.doc_category?.name}</Td>
        <Td>{note.doc_subject?.name}</Td>
        <Td>{note.doc_type?.name}</Td>
        <Td>{note.account?.username}</Td>
        <Td>
          <a
            href={`https://holy-grail-bucket.s3.ap-southeast-1.amazonaws.com/${note.file_name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </Td>
      </Tr>
    ));
  };

  return (
    <Box maxWidth="100%">
      <Box display="flex" justifyContent="center">
        <TableContainer sx={{ maxWidth: "80%" }}>
          <Table variant="simple" mt="8%">
            <Thead>
              <Tr>
                <Th>
                  <Combobox
                    label="Category"
                    value={category !== "" ? Number(category) : ""}
                    onChange={(newValue) => setCategory(Number(newValue))}
                    options={categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                  />
                </Th>
                <Th>
                  <Combobox
                    label="Subject"
                    value={subject !== "" ? Number(subject) : ""}
                    onChange={(newValue) => setSubject(Number(newValue))}
                    options={subjects.map((subject) => ({
                      value: subject.id,
                      label: subject.name,
                    }))}
                  />
                </Th>
                <Th>
                  <Combobox
                    label="Type"
                    value={type !== "" ? Number(type) : ""}
                    onChange={(newValue) => setType(Number(newValue))}
                    options={types.map((type) => ({
                      value: type.id,
                      label: type.name,
                    }))}
                  />
                </Th>
              </Tr>
              <Tr>
                <Th>Category</Th>
                <Th>Subject</Th>
                <Th>Type</Th>
                <Th>Uploaded by</Th>
                <Th>File</Th>
              </Tr>
            </Thead>
            <Tbody>{renderNotes()}</Tbody>
          </Table>
        </TableContainer>
      </Box>

      <HStack spacing={4} justifyContent="center" mt="10%">
        <Button
          onClick={() => handlePageChange(pageInfo.page - 1)}
          isDisabled={pageInfo.page === 1}
        >
          Prev
        </Button>
        <Text>
          Page {pageInfo.page} of {Math.ceil(pageInfo.total / pageInfo.size)}
        </Text>
        <Button
          onClick={() => handlePageChange(pageInfo.page + 1)}
          isDisabled={
            pageInfo.page === Math.ceil(pageInfo.total / pageInfo.size)
          }
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default NotesApplication;
