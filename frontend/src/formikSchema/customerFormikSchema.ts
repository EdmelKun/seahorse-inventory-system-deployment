import * as yup from 'yup';

const customerFormikSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  sex: yup
    .string()
    .oneOf(['MALE', 'FEMALE'], 'Invalid value for sex')
    .required('Sex is required'),
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email address is required'),
  contactNum: yup
    .string()
    .matches(
      /^09\d{9}$/,
      'Contact number must start with "09" and must be exactly 11 digits',
    )
    .required('Contact number is required'),
  country: yup.string().required('Country is required'),
  province: yup.string().required('Province is required'),
  municipality: yup.string().required('Municipality is required'),
  street: yup.string().required('Street is required'),
  zipCode: yup
    .number()
    .typeError('ZIP code is required')
    .positive('ZIP code must be positive')
    .integer('ZIP code must not contain decimals')
    .required('ZIP code is required'),
});

export default customerFormikSchema;
