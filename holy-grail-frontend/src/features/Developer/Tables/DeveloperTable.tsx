import { useState } from 'react';
import { CategoryType, DocumentType, SubjectType } from '@api/library';
import { Button, FreeTextCombobox, Pagination } from '@components';
import {
  AddPropertiesModal,
  DataTypeEnum,
  RoleEnumMapping,
  EditPropertiesModal,
  User,
} from '@features';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './Tables.css';

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
      <TableHead>
        {type === DataTypeEnum.USER ? (
          <>
            <TableCell>
              <h3>User ID</h3>
            </TableCell>
            <TableCell>
              <h3>Username</h3>
            </TableCell>
            <TableCell>
              <h3>Role</h3>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>
              <h3>ID</h3>
            </TableCell>
            <TableCell>
              <h3>Name</h3>
            </TableCell>
          </>
        )}

        {type === DataTypeEnum.SUBJECT && (
          <TableCell>
            <h3>Category</h3>
          </TableCell>
        )}
        <TableCell align='right'>
          <h3>Actions</h3>
        </TableCell>
      </TableHead>
    );
  };

  const renderTableRow = (item: DeveloperTableData) => {
    return (
      <TableRow key={isUserType(type, item) ? item.user_id : item.id}>
        {isUserType(type, item) ? (
          <TableCell>{item.user_id}</TableCell>
        ) : (
          <TableCell>{item.id}</TableCell>
        )}
        {isUserType(type, item) ? (
          <TableCell>{item.username}</TableCell>
        ) : (
          <TableCell>{item.name}</TableCell>
        )}

        {isSubjectType(type, item) && <TableCell>{item.category.name}</TableCell>}
        {isUserType(type, item) && <TableCell>{RoleEnumMapping[item.role]}</TableCell>}

        <TableCell align='right'>
          <Button onClick={() => handleEdit(item)}>
            <EditIcon />
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const handleFilterContent = () => {
    return data.filter((option: DeveloperTableData) => {
      if (type === DataTypeEnum.USER) {
        return 'username' in option && option.username.toLowerCase().includes(query.toLowerCase());
      } else {
        return 'name' in option && option.name.toLowerCase().includes(query.toLowerCase());
      }
    }) as T[];
  };

  const getCurrentPageData = () => {
    const startIndex = page * chunkSize;
    const endIndex = startIndex + chunkSize;
    return handleFilterContent().slice(startIndex, endIndex);
  };

  return (
    <div className='table-container'>
      <h2>{title}</h2>
      <Grid item xs={12} sm={4}>
        <Box display='flex' justifyContent='space-between' gap='10%'>
          <FreeTextCombobox
            label={`Search for ${type}`}
            value={query}
            onChange={(newValue: string) => setQuery(newValue)}
            sx={{ flexGrow: 1 }}
          />
          {type !== DataTypeEnum.USER && <Button onClick={handleAdd}>+ Add</Button>}
        </Box>
      </Grid>

      <TableContainer>
        <Table>
          {renderTableHeader()}
          <TableBody>{getCurrentPageData().map(renderTableRow)}</TableBody>
        </Table>
      </TableContainer>
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
      <Pagination
        pageInfo={{
          page: page + 1,
          size: chunkSize,
          total: handleFilterContent().length,
          pages: Math.ceil(handleFilterContent().length / chunkSize),
        }}
        handlePageChange={(newPage: number) => {
          setPage(newPage - 1);
        }}
      />
    </div>
  );
};
