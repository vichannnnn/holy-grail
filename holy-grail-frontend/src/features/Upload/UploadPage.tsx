import { useState, useEffect, useRef, useContext } from 'react';
import { Button, Text, Input } from '@chakra-ui/react';
import { Combobox } from '../Library/Combobox';
import { fetchData, CategoryType, SubjectType, DocumentType } from '../../api/utils/library/Search';
import { createNote } from '../../api/utils/actions/CreateNote';
import AuthContext from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MediaQueryContext from '../../providers/MediaQueryProvider';
import AlertToast, { AlertProps } from '../../components/AlertToast/AlertToast';
import './upload.css';

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

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | undefined>(undefined);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDesktop } = useContext(MediaQueryContext);

  useEffect(() => {
    fetchData().then(({ categories, subjects, types }) => {
      setCategories(categories);
      setSubjects(subjects);
      setTypes(types);
    });
    if (!user) {
      const alertContentRedirect: AlertProps = {
        title: 'Please login.',
        description: 'You need to be logged in to upload documents.',
        severity: 'error',
      };
      navigate('/login', { state: { alertContent: alertContentRedirect } });
    }
  }, []);

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
      setAlertContent({
        title: 'Error',
        description: 'You need to select everything and upload at least one file.',
        severity: 'error',
      });
      setOpenAlert(true);
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

      let alertContentRedirect: AlertProps; // Initialize the alertContentRedirect object outside the conditions

      if (responseStatus == 200) {
        alertContentRedirect = {
          title: 'Success',
          description: 'Successfully sent for review and will be shown in library once uploaded.',
          severity: 'success',
        };
        setAlertContent(alertContentRedirect);
        setOpenAlert(true);
        navigate('/', { state: { alertContent: alertContentRedirect } });
      } else if (responseStatus === 429) {
        alertContentRedirect = {
          title: 'Rate limit exceeded',
          description: "You're trying too fast! Please try again in 1 minutes.",
          severity: 'error',
        };
      } else if (responseStatus === 401) {
        alertContentRedirect = {
          title: 'Account not verified',
          description: 'Please verify your account with the verification mail sent to your email.',
          severity: 'error',
        };
      } else if (responseStatus === 409) {
        alertContentRedirect = {
          title: 'Notes upload unsuccessful',
          description:
            "A name of the note that you're trying to upload already exists in the repository.",
          severity: 'error',
        };
      } else {
        alertContentRedirect = {
          title: 'Error',
          description: 'Something went wrong. Please contact an administrator!',
          severity: 'error',
        };
      }
      setAlertContent(alertContentRedirect);
      setOpenAlert(true);
    }
  };

  return (
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
            onChange={(newValue) => setCategory(Number(newValue))}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />

          <Combobox
            label='Subject'
            value={subject !== '' ? Number(subject) : ''}
            style={{ width: '90%' }}
            onChange={(newValue) => setSubject(Number(newValue))}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
          />

          <Combobox
            label='Type'
            value={type !== '' ? Number(type) : ''}
            style={{ width: '90%' }}
            onChange={(newValue) => setType(Number(newValue))}
            options={types.map((type) => ({
              value: type.id,
              label: type.name,
            }))}
          />
        </div>
        <div className='upload__docName'>
          <Input
            value={documentName || ''}
            onChange={handleNameChange}
            placeholder='Enter document name'
            required={true}
            minLength={4}
            maxLength={100}
          />

          <input
            ref={inputFileRef}
            width={isDesktop ? '30%' : '90%'}
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
      </form>
      <AlertToast
        openAlert={openAlert}
        onClose={() => setOpenAlert(false)}
        alertContent={alertContent}
      />
    </section>
  );
};

export default UploadPage;
