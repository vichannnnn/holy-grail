import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { SubjectType, fetchAllSubjects } from '@api/library';

import { Button } from '@components/Button';
import { Combobox, ComboboxProps } from '@components/Combobox';
import { Modal } from '@components/Modal';

export type ValidationResult = Record<string, boolean>;

interface UpdateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    newCategory: number | '',
    newSubject: number | '',
    newType: number | '',
    newDocName: string | '',
    newYear: number | '',
  ) => void;
  categories: ComboboxProps['options'];
  types: ComboboxProps['options'];
  years: ComboboxProps['options'];
  category: ComboboxProps['value'];
  subject: ComboboxProps['value'];
  type: ComboboxProps['value'];
  year: ComboboxProps['value'];
  documentName: string;
}

export const UpdateNoteModal = ({
  isOpen,
  onClose,
  onConfirm,
  categories,
  types,
  years,
  category,
  subject,
  type,
  year,
  documentName,
}: UpdateNoteModalProps) => {
  const [newCategory, setNewCategory] = useState<number | ''>('');
  const [newSubject, setNewSubject] = useState<number | ''>('');
  const [newType, setNewType] = useState<number | ''>('');
  const [newDocName, setNewDocName] = useState<string>('');
  const [newYear, setNewYear] = useState<number | ''>('');

  const [subjectsData, setSubjectsData] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchInitialSubjects = async () => {
      setNewCategory(category);

      if (category) {
        const subjects = await fetchAllSubjects(category);
        setSubjectsData(
          subjects.map((subject: SubjectType) => ({
            id: subject.id,
            name: subject.name,
          })),
        );
      }
    };

    setNewSubject(subject);
    setNewType(type);
    setNewDocName(documentName);
    setNewYear(year);
    fetchInitialSubjects();
  }, [category, subject, type, year, documentName]);

  const handleCategoryChange = async (newValue: number | '') => {
    setNewCategory(newValue);
    if (newValue) {
      const subjects = await fetchAllSubjects(newValue);
      setSubjectsData(
        subjects.map((subject: SubjectType) => ({
          id: subject.id,
          name: subject.name,
        })),
      );
    } else {
      setSubjectsData([]);
      setNewSubject('');
    }
  };
  const validityChecks = (): ValidationResult => {
    return {
      'Title must be between 4 and 100 characters long':
        newDocName.length >= 4 && newDocName.length <= 100,
      'Category must be selected': newCategory !== '',
      'Subject must be selected': newSubject !== '',
      'Type must be selected': newType !== '',
    };
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='flex flex-col'>
        <h2 className='text-xl font-semibold mb-4'>Edit Note</h2>

        <TextField
          variant='outlined'
          label='Title'
          value={newDocName}
          onChange={(e) => {
            setNewDocName(e.target.value);
          }}
          className='mb-4 w-full'
        />

        <Combobox
          label='Category'
          value={newCategory}
          options={categories}
          onChange={async (newValue) => handleCategoryChange(newValue)}
          disablePortal={true}
          className='mb-4'
        />

        <Combobox
          label='Subject'
          value={newSubject}
          options={subjectsData}
          onChange={(newValue) => setNewSubject(newValue)}
          disablePortal={true}
          className='mb-4'
        />

        <Combobox
          label='Type'
          value={newType}
          options={types}
          onChange={(newValue) => setNewType(newValue)}
          disablePortal={true}
          className='mb-4'
        />

        <Combobox
          label='Year'
          value={newYear}
          options={years}
          onChange={(newValue) => setNewYear(newValue)}
          disablePortal={true}
          className='mb-4'
        />

        <div className='flex justify-end mt-2'>
          <Button className='mr-2' onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={Object.values(validityChecks()).some((elem) => !elem)}
            onClick={() => {
              setNewCategory('');
              setNewSubject('');
              setNewDocName('');
              setNewType('');
              onConfirm(newCategory, newSubject, newType, newDocName, newYear);
              onClose();
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
