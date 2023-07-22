import * as Yup from 'yup';

export const SignUpValidation = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{4,20}$/,
      'Invalid username. It should contain 4 to 20 alphanumeric characters.',
    )
    .required('Username is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  password: Yup.string()
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
