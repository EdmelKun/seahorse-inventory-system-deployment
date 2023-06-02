import * as yup from 'yup';

const classificationFormikSchema = yup.object().shape({
  classificationName: yup.string().required('Classification is required'),
});

export default classificationFormikSchema;
