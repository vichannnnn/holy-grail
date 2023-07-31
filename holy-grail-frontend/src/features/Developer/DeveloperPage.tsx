import { useEffect, useState, SyntheticEvent } from 'react';
import { CategoryType, DocumentType, fetchData, SubjectType } from '@api/library';
import { User, TabContent, TabContentSubjects, Hero, TabContentUsers } from '@features';
import { Tab, Tabs } from '@mui/material';

export const DeveloperPage = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
    users: User[];
  }>({ categories: [], subjects: [], types: [], users: [] });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchDataAndUpdateState = async () => {
    const newData = await fetchData();
    setData(newData);
  };

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <>
      <Hero />
      <section className='library section container'>
        <div>
          <div className='sub-section__title'>Developer Panel</div>
          <div className='section__subtitle'>
            Create or update subjects, education level (categories) and types of resources here.
            Additionally, you can update the user's permissions here as well.
          </div>
        </div>

        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Categories' />
          <Tab label='Subjects' />
          <Tab label='Types' />
          <Tab label='Users' />
        </Tabs>
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
        {value === 3 && (
          <TabContentUsers title='Users' data={data.users} fetchData={fetchDataAndUpdateState} />
        )}
      </section>
    </>
  );
};
