import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  VStack,
  Heading,
  Box,
  Text,
  useToast,
  Input,
} from "@chakra-ui/react";
import Combobox from "../Library/Combobox";
import {
  fetchData,
  CategoryType,
  SubjectType,
  DocumentType,
} from "../../utils/library/Search";
import { createNote } from "../../utils/actions/CreateNote";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const [category, setCategory] = useState<number | "">(0);
  const [subject, setSubject] = useState<number | "">(0);
  const [type, setType] = useState<number | "">(0);

  const [fileName, setFileName] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const toast = useToast();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
    });
  }, []);

  if (!user) {
    navigate("/login");
  }

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile || category === "" || subject === "" || type === "") {
      toast({
        title: "Error",
        description:
          "You need to select everything and upload at least one file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (selectedFile) {
      const responseStatus = await createNote(
        selectedFile,
        category,
        subject,
        type,
        documentName || ""
      );
      if (responseStatus == 200) {
        toast({
          title: "Success",
          description:
            "Successfully sent for review and will be shown in library once uploaded.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (responseStatus === 429) {
        toast({
          title: "You're submitting too fast!",
          description: "You can only upload 1 document per minute.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={6} w="80%" align="center" mx="auto" mb="30%">
        <Heading mt={8} size="xl">
          Upload Notes
        </Heading>
        <Box w="30%">
          <Combobox
            label="Category"
            value={category !== "" ? Number(category) : ""}
            onChange={(newValue) => setCategory(Number(newValue))}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Box>
        <Box w="30%">
          <Combobox
            label="Subject"
            value={subject !== "" ? Number(subject) : ""}
            onChange={(newValue) => setSubject(Number(newValue))}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
          />
        </Box>
        <Box w="30%">
          <Combobox
            label="Type"
            value={type !== "" ? Number(type) : ""}
            onChange={(newValue) => setType(Number(newValue))}
            options={types.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
          />
        </Box>
        <Box w="30%">
          <Input
            value={documentName || ""}
            onChange={handleNameChange}
            placeholder="Enter document name"
            required={true}
            minLength={4}
            maxLength={30}
          />
        </Box>

        <input
          ref={inputFileRef}
          type="file"
          accept="application/pdf"
          // , text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <Button onClick={handleButtonClick} colorScheme="blue">
          Upload File
        </Button>
        <Text>{fileName || "No file chosen"}</Text>

        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default UploadPage;
