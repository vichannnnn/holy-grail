import { useEffect, useState, SyntheticEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryType, DocumentType, fetchLibraryTypes, SubjectType } from '@api/library';
import { AlertProps, WelcomeBackHeader } from '@components';
import { User, TabContent, TabContentSubjects, TabContentUsers } from '@features';
import { Tab, Tabs } from '@mui/material';
import { AuthContext } from '@providers';
import './DeveloperPage.css';

export const DeveloperPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
    users: User[];
  }>({ categories: [], subjects: [], types: [], users: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'You are not allowed here!',
          description: 'Please log in as an administrator or developer to access this page.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchDataAndUpdateState = async () => {
    const newData = await fetchLibraryTypes(null, true);
    setData(newData);
  };

  useEffect(() => {
    fetchLibraryTypes(null, true).then(setData);
  }, []);

  return (
    <div className='developer-page-container'>
      <WelcomeBackHeader />
      <div>
        <div className='developer-title'>Developer Panel</div>
        <div className='developer-subtitle'>
          Create or update subjects, education level (categories) and types of resources here.
          Additionally, you can update the user's permissions here as well.
        </div>
      </div>
      <div className='developer-panel-table'>
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Categories' />
            <Tab label='Subjects' />
            <Tab label='Types' />
            <Tab label='Users' />
          </Tabs>
        </div>
        <div>
          {value === 0 && (
            <TabContent
              title='Categories'
              type='categories'
              data={data.categories}
              fetchData={fetchDataAndUpdateState}
            />
          )}
          {value === 1 && (
            <TabContentSubjects
              title='Subjects'
              data={data.subjects}
              fetchData={fetchDataAndUpdateState}
            />
          )}
          {value === 2 && (
            <TabContent
              title='Types'
              type='types'
              data={data.types}
              fetchData={fetchDataAndUpdateState}
            />
          )}
          {value === 3 && <TabContentUsers data={data.users} fetchData={fetchDataAndUpdateState} />}
        </div>
      </div>
    </div>
  );
};
