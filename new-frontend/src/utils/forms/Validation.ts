import * as Yup from 'yup';

//TODO: Need to do proper validation on username, password, and email based on their conditions

export const SignInValidation = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.'),
});

export const RegisterValidation = Yup.object().shape({
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
  marketing_consent: Yup.boolean(),
});

export const UpdateEmailValidation = Yup.object().shape({
  new_email: Yup.string().required('New email is a required field'),
});

export const UpdatePasswordValidation = Yup.object().shape({
  before_password: Yup.string().required('Password is a required field'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(30, 'Password cannot exceed 30 characters')
    .required('New password is required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required'),
});

export const ForgotPasswordValidation = Yup.object().shape({
  email: Yup.string().required('Email is a required field'),
});
