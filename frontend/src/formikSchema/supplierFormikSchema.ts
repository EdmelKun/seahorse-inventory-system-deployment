import * as yup from 'yup';

const supplierFormikSchema = yup.object().shape({
  contactName: yup.string().required("Contact person's name is required"),
  businessName: yup.string().required('Business name is required'),
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email address is required'),
  contactNum: yup
    .string()
    .matches(/^0[9]\d{9}$/, 'Contact number is not valid')
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

export default supplierFormikSchema;
