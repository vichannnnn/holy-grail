import { SyntheticEvent, useEffect, useState } from 'react';
import { CategoryType, DocumentType, fetchData, SubjectType } from '@api/library';
import {
  DeveloperAddModal,
  DataTypeKey,
  DeveloperEditModal,
  DeveloperEditUserModal,
  RoleEnum,
  User,
  TabContent,
  Hero,
  TabContentUsers,
} from '@features';
import { Tab, Tabs } from '@mui/material';

const useModalState = <T,>(initialState: T) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T>(initialState);

  const openModal = (newData: T) => {
    setData(newData);
    setIsOpen(true);
  };
  const closeModal = () => {
    setData(initialState);
    setIsOpen(false);
  };

  return { isOpen, data, openModal, closeModal };
};

export const DeveloperPage = () => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState<{
    categories: CategoryType[];
    subjects: SubjectType[];
    types: DocumentType[];
    users: User[];
  }>({ categories: [], subjects: [], types: [], users: [] });

  const addModalState = useModalState<DataTypeKey | null>(null);
  const editModalState = useModalState<{ id: number; type: DataTypeKey } | null>(null);
  const editUserModalState = useModalState<{
    userId: number;
    username: string;
    role: RoleEnum;
  } | null>(null);

  const refreshData = async () => {
    addModalState.closeModal();
    editModalState.closeModal();
    await fetchData().then(setData);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openEditModal = (id: number, type: DataTypeKey) => {
    editModalState.openModal({ id, type });
  };

  const openEditUserModal = (userId: number, username: string, role: RoleEnum) => {
    editUserModalState.openModal({ userId, role, username });
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
        {addModalState.isOpen && (
          <DeveloperAddModal
            isOpen={addModalState.isOpen}
            onClose={addModalState.closeModal}
            onSuccessfulAdd={refreshData}
            type={addModalState.data}
          />
        )}
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Categories' />
          <Tab label='Subjects' />
          <Tab label='Types' />
          <Tab label='Users' />
        </Tabs>
        {value === 0 && (
          <TabContent
            title='Categories'
            data={data.categories}
            handleEdit={openEditModal}
            handleAdd={() => addModalState.openModal('categories')}
            type='categories'
          />
        )}
        {value === 1 && (
          <TabContent
            title='Subjects'
            data={data.subjects}
            handleEdit={openEditModal}
            handleAdd={() => addModalState.openModal('subjects')}
            type='subjects'
          />
        )}
        {value === 2 && (
          <TabContent
            title='Types'
            data={data.types}
            handleEdit={openEditModal}
            handleAdd={() => addModalState.openModal('types')}
            type='types'
          />
        )}
        {value === 3 && (
          <TabContentUsers
            data={data.users}
            handleEdit={(userId: number) => {
              const user = data.users.find((u) => u.user_id === userId);
              if (user) {
                openEditUserModal(user.user_id, user.username, user.role);
              }
            }}
          />
        )}
        {editUserModalState.isOpen && editUserModalState.data && (
          <DeveloperEditUserModal
            isOpen={editUserModalState.isOpen}
            onClose={editUserModalState.closeModal}
            onSubmit={async (newRole: RoleEnum) => {
              await refreshData();
            }}
            initialRole={editUserModalState.data.role}
            userName={editUserModalState.data.username}
            userId={editUserModalState.data.userId}
          />
        )}
        {editModalState.isOpen && editModalState.data && (
          <DeveloperEditModal
            isOpen={editModalState.isOpen}
            onClose={editModalState.closeModal}
            onSuccessfulUpdate={refreshData}
            initialName={(
              data[editModalState.data.type] as Array<
                CategoryType | SubjectType | DocumentType | User
              >
            ).reduce((name: string, item: CategoryType | SubjectType | DocumentType | User) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              if ('id' in item && item.id === editModalState.data.id) {
                return item.name;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              } else if ('user_id' in item && item.user_id === editModalState.data.id) {
                return item.username;
              }
              return name;
            }, '')}
            type={editModalState.data.type}
            id={editModalState.data.id}
          />
        )}
      </section>
    </>
  );
};
