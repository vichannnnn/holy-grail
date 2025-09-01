'use client';

import { AddPropertiesModal, EditPropertiesModal } from '@layouts/Developer/Modal';
import { DataTypeEnum, RoleEnumMapping } from '@layouts/Developer/types';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from 'react';

import { CategoryType, DocumentType, SubjectType } from '@api/library';

import { Button } from '@components/Button';
import { FreeTextCombobox } from '@components/Combobox';

import { Pagination } from '@features/Library';

import { User } from '@providers/AuthProvider';

type DeveloperTableData = CategoryType | DocumentType | SubjectType | User;

interface DeveloperTableProps<T> {
  title: string;
  data: T[];
  type: DataTypeEnum;
  fetchData: () => void;
}

export const DeveloperTable = <T extends DeveloperTableData>({
  title,
  data,
  type,
  fetchData,
}: DeveloperTableProps<T>) => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const chunkSize = 50;

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<DeveloperTableData | null>(null);

  const isSubjectType = (type: DataTypeEnum, _?: DeveloperTableData): _ is SubjectType => {
    return type === DataTypeEnum.SUBJECT;
  };

  const isUserType = (type: DataTypeEnum, _?: DeveloperTableData): _ is User => {
    return type === DataTypeEnum.USER;
  };

  const handleEdit = (item: DeveloperTableData) => {
    setEditedItem(item);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setEditedItem(null);
    setIsAddModalOpen(true);
  };

  const renderTableHeader = () => {
    return (
      <thead className='bg-gray-50'>
        <tr>
          {type === DataTypeEnum.USER ? (
            <>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Username
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Role
              </th>
            </>
          ) : (
            <>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
            </>
          )}

          {type === DataTypeEnum.SUBJECT && (
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Category
            </th>
          )}
          <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Actions
          </th>
        </tr>
      </thead>
    );
  };

  const renderTableRow = (item: DeveloperTableData) => {
    return (
      <tr key={isUserType(type, item) ? item.user_id : item.id} className='hover:bg-gray-50'>
        {isUserType(type, item) ? (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.user_id}</td>
        ) : (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.id}</td>
        )}
        {isUserType(type, item) ? (
          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
            {item.username}
          </td>
        ) : (
          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
            {item.name}
          </td>
        )}

        {isSubjectType(type, item) && (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
            {item.category.name}
          </td>
        )}
        {isUserType(type, item) && (
          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
            {RoleEnumMapping[item.role]}
          </td>
        )}

        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
          <Button
            onClick={() => handleEdit(item)}
            className='inline-flex items-center p-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <ModeEditIcon className='h-4 w-4' />
          </Button>
        </td>
      </tr>
    );
  };

  const filteredData = data.filter((option: DeveloperTableData) => {
    if (type === DataTypeEnum.USER) {
      return 'username' in option && option.username.toLowerCase().includes(query.toLowerCase());
    } else {
      return 'name' in option && option.name.toLowerCase().includes(query.toLowerCase());
    }
  }) as T[];

  const getCurrentPageData = () => {
    const startIndex = page * chunkSize;
    const endIndex = startIndex + chunkSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const pageData = getCurrentPageData();

  return (
    <div className='flex flex-col'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>{title}</h2>
        <div className='flex justify-between items-center'>
          <div className='grow mr-4'>
            <FreeTextCombobox
              label={`Search for ${type}`}
              value={query}
              onChange={(newValue: string) => setQuery(newValue)}
              className='w-full'
            />
          </div>
          {type !== DataTypeEnum.USER && (
            <Button
              onClick={handleAdd}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-xs text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              + Add
            </Button>
          )}
        </div>
      </div>

      <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          {renderTableHeader()}
          <tbody className='bg-white divide-y divide-gray-200'>
            {pageData.map(renderTableRow)}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && editedItem && (
        <EditPropertiesModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={editedItem}
          type={type}
          onSuccessfulUpdate={fetchData}
        />
      )}

      {isAddModalOpen && (
        <AddPropertiesModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          type={type}
          onSuccessfulAdd={fetchData}
        />
      )}

      <div className='mt-4'>
        <Pagination
          pageInfo={{
            page: page + 1,
            size: chunkSize,
            total: filteredData.length,
            pages: Math.ceil(filteredData.length / chunkSize),
          }}
          handlePageChange={(newPage: number) => {
            setPage(newPage - 1);
          }}
        />
      </div>
    </div>
  );
};
