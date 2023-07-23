import * as Yup from 'yup';

export const ChangeEmailValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const ChangePasswordValidation = Yup.object().shape({
  password: Yup.string().required('Password is required'),

  newPassword: Yup.string()
    .matches(/[!@#$%^&*]/, 'Password must contain a special character.')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(30, 'Password cannot exceed 30 characters.')
    .required('Password is required'),

  repeatPassword: Yup.string()
    .test('repeatPassword-log', 'Invalid repeatPassword', (value, context) => {
      console.log('Testing repeatPassword:', value);
      return value === context.parent.password;
    })
    .required('Repeat password is required'),
});
