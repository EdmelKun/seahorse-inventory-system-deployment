import * as yup from 'yup';

const productFormikSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  brand: yup.string().required('Brand is required'),
  classification: yup
    .array()
    .min(1, 'At least one classification is required')
    .required('Classification is required'),
  retailPrice: yup
    .number()
    .typeError('Retail price is required')
    .required('Retail price is required'),
  wholesalePrice: yup
    .number()
    .typeError('Wholesale price is required')
    .required('Wholesale price is required'),
  lowstockAlert: yup
    .number()
    .typeError('Low stock alert is required')
    .integer()
    .required('Low stock alert is required'),
  wholesaleAmount: yup
    .number()
    .typeError('Wholesale amount is required')
    .integer()
    .required('Wholesale amount is required'),
  warehouseStock: yup
    .number()
    .typeError('Warehouse stock is required')
    .integer()
    .required('Warehouse stock is required'),
  storeStock: yup
    .number()
    .typeError('Store stock is required')
    .integer()
    .required('Store stock is required'),
  description: yup.string().required('Description is required'),
});

export const editProductLogsFormikSchema = yup.object().shape({
  retailPrice: yup
    .number()
    .typeError('Retail price is required')
    .required('Retail price is required'),
  wholesalePrice: yup
    .number()
    .typeError('Wholesale price is required')
    .required('Wholesale price is required'),
  wholesaleAmount: yup
    .number()
    .typeError('Wholesale amount is required')
    .integer()
    .required('Wholesale amount is required'),
  warehouseStock: yup
    .number()
    .typeError('Warehouse stock is required')
    .integer()
    .required('Warehouse stock is required'),
  storeStock: yup
    .number()
    .typeError('Store stock is required')
    .integer()
    .required('Store stock is required'),
});

export default productFormikSchema;
