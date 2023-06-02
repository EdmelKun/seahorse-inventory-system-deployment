// import { DataFromBackend } from '../types/backendData';
import { ClassificationQueueDocType } from './schema/classification/classificationQueue';
import { ClassificationOnProductsQueueDocType } from './schema/classificationOnProducts/classificationOnProductsQueue';
import { CustomerQueueDocType } from './schema/customer/customerQueue';
import { ProductQueueDocType } from './schema/product/productQueue';
import { ProductLogsQueueDocType } from './schema/productLogs/productLogsQueue';
import { SupplierQueueDocType } from './schema/supplier/supplierQueue';
import selectAllData from './selectTools';

// type ModifiedProductQueueDocType = Omit<ProductQueueDocType, 'id'> & { id: number };

export type QueueCollectionData = {
  products: ProductQueueDocType[];
  customers: CustomerQueueDocType[];
  suppliers: SupplierQueueDocType[];
  productLogs: ProductLogsQueueDocType[];
  classifications: ClassificationQueueDocType[];
  classificationOnProducts: ClassificationOnProductsQueueDocType[];
};
const convertId = (e: { id: string }) => ({ ...e, id: Number(e.id) });

const fetchMutateData = (data: QueueCollectionData) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/data/mutate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
    body: JSON.stringify({
      products: data.products.map(convertId),
      productLogs: data.productLogs.map(convertId),
      customers: data.customers.map(convertId),
      suppliers: data.suppliers.map(convertId),
      classifications: data.classifications.map(convertId),
      classificationOnProducts: data.classificationOnProducts.map(convertId),
    }),
  }).then((response) => response.json());
// .then((result) => {
//   if (result.success) {
//     return result.data as DataFromBackend;
//   }
//   return {
//     products: [],
//     customers: [],
//     suppliers: [],
//     productLogs: [],
//   } as DataFromBackend;
// })
// .catch(
//   () =>
//     ({
//       products: [],
//       customers: [],
//       suppliers: [],
//       productLogs: [],
//     } as DataFromBackend),
// );

export const getAllQueueCollections = () =>
  Promise.all([
    selectAllData('PRODUCT_QUEUE'),
    selectAllData('CUSTOMER_QUEUE'),
    selectAllData('SUPPLIER_QUEUE'),
    selectAllData('PRODUCT_LOGS_QUEUE'),
    selectAllData('CLASSIFICATION_QUEUE'),
    selectAllData('CLASSIFICATION_ON_PRODUCTS_QUEUE'),
  ]).then(
    (result) =>
      ({
        products: result[0],
        customers: result[1],
        suppliers: result[2],
        productLogs: result[3],
        classifications: result[4],
        classificationOnProducts: result[5],
      } as QueueCollectionData),
  );

export default fetchMutateData;
