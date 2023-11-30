import * as Yup from 'yup';
import { NoteInfoProps, NotesFormData, RoleEnum } from '@features';

const SUPPORTED_FORMATS = ['application/pdf', 'application/zip'];
const SOME_SIZE_LIMIT = 1048576000;

export const SignUpValidation = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]{4,20}$/, 'Username should contain 4 to 20 alphanumeric characters')
    .required('Username is required'),

  email: Yup.string().email('Invalid email provided').required('Email is required'),

  password: Yup.string()
    .matches(/[!@#$%^&*]/, 'Password must contain a special character')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('Password is required'),

  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});

export const SignInValidation = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const ResetPasswordValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email provided').required('Email is required'),
});

export const UpdatePasswordValidation = Yup.object().shape({
  before_password: Yup.string().required('Password is required'),
  password: Yup.string()
    .matches(/\W/, 'Password must contain a special character')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('Password is required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});

export const ChangeEmailValidation = Yup.object().shape({
  new_email: Yup.string().email('Invalid email').required('Email is required'),
});

const UploadNoteValidation = Yup.object<NoteInfoProps>().shape({
  name: Yup.string()
    .required('Document name is required')
    .min(1, 'Minimum 1 character')
    .max(100, 'Maximum 100 characters'),
  subject: Yup.number()
    .typeError('Subject is required')
    .required('Subject is required')
    .notOneOf([0], 'Subject is required'),
  type: Yup.number()
    .typeError('Type is required')
    .required('Type is required')
    .notOneOf([0], 'Type is required'),
  category: Yup.number()
    .typeError('Category is required')
    .required('Category is required')
    .notOneOf([0], 'Category is required'),
  file: Yup.mixed<File>()
    .required()
    .test(
      'fileSize',
      'File too large',
      (value) => value instanceof File && value.size <= SOME_SIZE_LIMIT,
    )
    .test(
      'fileType',
      'Unsupported File Format',
      (value) => value instanceof File && SUPPORTED_FORMATS.includes(value.type),
    ),
});

export const UploadNotesValidation = Yup.object<NotesFormData>().shape({
  notes: Yup.array<NoteInfoProps>().of(UploadNoteValidation).required(),
});

export const DeveloperAddTypeValidation = Yup.object().shape({
  name: Yup.string().required('Field is required'),
});

export const DeveloperAddSubjectValidation = Yup.object().shape({
  category_id: Yup.number().required('Field is required'),
  name: Yup.string().required('Field is required'),
});

export const DeveloperAddUserValidation = Yup.object().shape({
  role: Yup.number<RoleEnum>().required('Field is required'),
});
