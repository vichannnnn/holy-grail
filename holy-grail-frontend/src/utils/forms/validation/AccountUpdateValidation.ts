import * as Yup from 'yup';

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
