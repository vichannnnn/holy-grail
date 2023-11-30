import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { CategoryType, DocumentType, fetchLibraryTypes, SubjectType } from '@api/library';
import { AlertProps, WelcomeBackHeader } from '@components';
import { DataTypeEnum, DeveloperTable, User } from '@features';
import { Tab, Tabs } from '@mui/material';
import { AuthContext } from '@providers';
import { useNavigation } from '@utils';
import './DeveloperPage.css';

type TabMappingType<T> = {
  [key: number]: {
    title: string;
    type: DataTypeEnum;
    data: T[];
  };
};

export const DeveloperPage = () => {
  type T = CategoryType | SubjectType | DocumentType | User;
  const { user, isLoading } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
    users: User[];
  }>({ categories: [], subjects: [], types: [], users: [] });
  const { goToLoginPage } = useNavigation();

  const tabMapping: TabMappingType<T> = {
    0: { title: 'Categories', type: DataTypeEnum.CATEGORY, data: data.categories },
    1: { title: 'Subjects', type: DataTypeEnum.SUBJECT, data: data.subjects },
    2: { title: 'Types', type: DataTypeEnum.TYPE, data: data.types },
    3: { title: 'Users', type: DataTypeEnum.USER, data: data.users },
  };

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchDataAndUpdateState = async () => {
    const newData = await fetchLibraryTypes(null, true);
    setData(newData);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'You are not allowed here!',
          description: 'Please log in as an administrator or developer to access this page.',
          severity: 'error',
        };
        goToLoginPage({ state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

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
          <DeveloperTable
            title={tabMapping[value].title}
            data={tabMapping[value].data}
            type={tabMapping[value].type}
            fetchData={fetchDataAndUpdateState}
          />
        </div>
      </div>
    </div>
  );
};
