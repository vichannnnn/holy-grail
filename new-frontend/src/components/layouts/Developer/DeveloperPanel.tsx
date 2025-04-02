'use client';

import { DeveloperTable } from '@layouts/Developer/DeveloperTable';
import { DataTypeEnum } from '@layouts/Developer/types';
import { useContext, useEffect, useState } from 'react';

import { CategoryType, DocumentType, SubjectType, fetchLibraryTypes } from '@api/library';

import { AuthContext, User } from '@providers/AuthProvider';

import { useNavigate } from '@utils/navigation';

type TabMappingType<T> = {
  [key: number]: {
    title: string;
    type: DataTypeEnum;
    data: T[];
  };
};

export const DeveloperPanel = () => {
  type T = CategoryType | SubjectType | DocumentType | User;
  const { user, isLoading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
    users: User[];
  }>({ categories: [], subjects: [], types: [], users: [] });
  const router = useNavigate();

  const tabMapping: TabMappingType<T> = {
    0: { title: 'Categories', type: DataTypeEnum.CATEGORY, data: data.categories },
    1: { title: 'Subjects', type: DataTypeEnum.SUBJECT, data: data.subjects },
    2: { title: 'Types', type: DataTypeEnum.TYPE, data: data.types },
    3: { title: 'Users', type: DataTypeEnum.USER, data: data.users },
  };

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const fetchDataAndUpdateState = async () => {
    const newData = await fetchLibraryTypes(null, true);
    setData(newData);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // const alertContentRedirect: AlertProps = {
        //   title: 'You are not allowed here!',
        //   description: 'Please log in as an administrator or developer to access this page.',
        //   severity: 'error',
        // };
        router.navigateTo('/login');
      }
    }
  }, [isLoading, user]);

  useEffect(() => {
    fetchLibraryTypes(null, true).then(setData);
  }, []);

  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-12'>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Developer Panel</h1>
        <p className='mt-2 text-base text-gray-600'>
          Create or update subjects, education level (categories) and types of resources here.
          Additionally, you can update the user&#39;s permissions here as well.
        </p>
      </div>

      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px'>
            {Object.entries(tabMapping).map(([key, { title }]) => {
              const index = Number(key);
              const isActive = activeTab === index;

              return (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`py-4 px-6 text-sm font-medium ${
                    isActive
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </nav>
        </div>

        <div className='p-6'>
          <DeveloperTable
            title={tabMapping[activeTab].title}
            data={tabMapping[activeTab].data}
            type={tabMapping[activeTab].type}
            fetchData={fetchDataAndUpdateState}
          />
        </div>
      </div>
    </div>
  );
};
