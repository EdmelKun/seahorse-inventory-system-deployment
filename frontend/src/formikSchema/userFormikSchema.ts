import * as yup from 'yup';

const userFormikSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .max(8, 'Password must not exceed 8 characters')
    .required('Password is required'),
  admin: yup
    .string()
    .oneOf(['YES', 'NO'], 'Admin must be yes or no only')
    .required('Admin permissions is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default userFormikSchema;
