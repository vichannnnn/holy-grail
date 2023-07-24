import * as Yup from 'yup';

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
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const ChangePasswordValidation = Yup.object().shape({
  currentPassword: Yup.string().required('Password is required'),

  newPassword: Yup.string()
    .matches(/[!@#$%^&*]/, 'Password must contain a special character.')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(30, 'Password cannot exceed 30 characters.')
    .required('Password is required'),

  repeatPassword: Yup.string()
    .test('repeatPassword-log', 'Repeat password does not match new password', (value, context) => {
      return value === context.parent.newPassword;
    })
    .required('Repeat password is required'),
});
