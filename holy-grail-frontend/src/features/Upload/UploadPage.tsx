<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { Button, VStack, Heading, Text, useToast, Input } from '@chakra-ui/react';
import Combobox from '../Library/Combobox';
import { fetchData, CategoryType, SubjectType, DocumentType } from '../../api/utils/library/Search';
import { createNote } from '../../api/utils/actions/CreateNote';
import { useContext } from 'react';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './upload.css';
=======
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  VStack,
  Heading,
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
import { useMediaQuery } from "react-responsive";
import "./upload.css"
>>>>>>> bbe493b (new FE (desktop))

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const [category, setCategory] = useState<number | ''>(0);
  const [subject, setSubject] = useState<number | ''>(0);
  const [type, setType] = useState<number | ''>(0);

  const [fileName, setFileName] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const toast = useToast();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
    });
  }, []);

  if (!user) {
    navigate('/login');
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

    if (!selectedFile || category === '' || subject === '' || type === '') {
      toast({
        title: 'Error',
        description: 'You need to select everything and upload at least one file.',
        status: 'error',
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
        documentName || '',
      );
      if (responseStatus == 200) {
        toast({
          title: 'Success',
          description: 'Successfully sent for review and will be shown in library once uploaded.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else if (responseStatus === 429) {
        toast({
          title: "You're submitting too fast!",
          description: 'You can only upload 1 document per minute.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (responseStatus === 401) {
        toast({
          title: 'Your account has not been verified yet.',
          description: 'Please verify your account with the verification mail sent to your email.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
<<<<<<< HEAD
    <section className='upload section container'>
      <form onSubmit={handleSubmit}>
        <div className='section__title'>Upload Materials</div>
        <div className='section__subtitle'>
          Upload your materials here! All submitted materials will be reviewed before being
          published to the Holy Grail.
        </div>
        <div className='upload__file'>
          <Button onClick={handleButtonClick} colorScheme='blue'>
            Upload File
          </Button>
          <Text>{fileName || 'No file chosen'}</Text>
        </div>
        <div className='upload__filter grid'>
          <Combobox
            label='Category'
            value={category !== '' ? Number(category) : ''}
            style={{ width: '90%' }}
=======
    <section className="upload section container">
      <form onSubmit={handleSubmit}>
        <div className="section__title">Upload Materials</div>
        <div className="section__subtitle">
          Upload your materials here! All submitted materials will be reviewed
          before being published to the Holy Grail.
        </div>
        <div className="upload__file">
          <Button onClick={handleButtonClick} colorScheme="blue">
            Upload File
          </Button>
          <Text>{fileName || "No file chosen"}</Text>
        </div>
        <div className="upload__filter grid">
          <Combobox
            label="Category"
            value={category !== "" ? Number(category) : ""}
            style={{ width: "90%" }}
>>>>>>> bbe493b (new FE (desktop))
            onChange={(newValue) => setCategory(Number(newValue))}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />

          <Combobox
<<<<<<< HEAD
            label='Subject'
            value={subject !== '' ? Number(subject) : ''}
            style={{ width: '90%' }}
=======
            label="Subject"
            value={subject !== "" ? Number(subject) : ""}
            style={{ width: "90%" }}
>>>>>>> bbe493b (new FE (desktop))
            onChange={(newValue) => setSubject(Number(newValue))}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
          />

          <Combobox
<<<<<<< HEAD
            label='Type'
            value={type !== '' ? Number(type) : ''}
            style={{ width: '90%' }}
=======
            label="Type"
            value={type !== "" ? Number(type) : ""}
            style={{ width: "90%" }}
>>>>>>> bbe493b (new FE (desktop))
            onChange={(newValue) => setType(Number(newValue))}
            options={types.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
          />
        </div>
<<<<<<< HEAD
        <div className='upload__docName'>
          <Input
            value={documentName || ''}
            onChange={handleNameChange}
            placeholder='Enter document name'
=======
        <div className="upload__docName">
          <Input
            value={documentName || ""}
            onChange={handleNameChange}
            placeholder="Enter document name"
>>>>>>> bbe493b (new FE (desktop))
            required={true}
            minLength={4}
            maxLength={100}
          />

          <input
            ref={inputFileRef}
<<<<<<< HEAD
            width={isMobile ? '90%' : '30%'}
            type='file'
            accept='application/pdf'
            // , text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <Button colorScheme='blue' type='submit'>
          Submit
        </Button>
=======
            width={isMobile ? "90%" : "30%"}
            type="file"
            accept="application/pdf"
            // , text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
>>>>>>> bbe493b (new FE (desktop))
      </form>
    </section>
  );
};

export default UploadPage;
