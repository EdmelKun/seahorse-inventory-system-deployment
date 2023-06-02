import { DataFromBackend } from '../types/backendData';
import { ClassificationFromBackend } from '../types/classification';
import { ClassificationOnProductsFromBackend } from '../types/classificationOnProducts';
import { CustomerFromBackend } from '../types/customer';
import { ProductFromBackend } from '../types/product';
import { ProductLogsFromBackend } from '../types/productLogs';
import { SupplierFromBackend } from '../types/supplier';
import rxdb from './initializeRxdb';

const fetchBackendData = () =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/data/queryAllTables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: document.cookie,
      credentials: 'include',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        return result.data as DataFromBackend;
      }
      return {
        products: [],
        customers: [],
        suppliers: [],
        productLogs: [],
        classifications: [],
        classificationOnProducts: [],
      } as DataFromBackend;
    })
    .catch(
      () =>
        ({
          products: [],
          customers: [],
          suppliers: [],
          productLogs: [],
          classifications: [],
          classificationOnProducts: [],
        } as DataFromBackend),
    );

export const insertToRxdb = async (data: DataFromBackend) => {
  const convertedProducts = data.products.map((e: ProductFromBackend) => ({
    ...e,
    id: String(e.id),
  }));

  const convertedCustomers = data.customers.map((e: CustomerFromBackend) => ({
    ...e,
    id: String(e.id),
  }));

  const convertedSuppliers = data.suppliers.map((e: SupplierFromBackend) => ({
    ...e,
    id: String(e.id),
  }));

  const convertedProductLogs = data.productLogs.map(
    (e: ProductLogsFromBackend) => ({
      ...e,
      id: String(e.id),
    }),
  );

  const convertedClassifications = data.classifications.map(
    (e: ClassificationFromBackend) => ({
      ...e,
      id: String(e.id),
    }),
  );

  const convertedClassificationOnProducts = data.classificationOnProducts.map(
    (e: ClassificationOnProductsFromBackend) => ({
      ...e,
      id: String(e.id),
    }),
  );

  return rxdb.then((db) =>
    Promise.all([
      // convertedProducts.map((e) => db.products.upsert(e)),
      // convertedCustomers.map((e) => db.customers.upsert(e)),
      // convertedSuppliers.map((e) => db.suppliers.upsert(e)),
      // convertedProductLogs.map((e) => db.productLogs.upsert(e)),

      db.products.bulkInsert(convertedProducts),
      db.customers.bulkInsert(convertedCustomers),
      db.suppliers.bulkInsert(convertedSuppliers),
      db.productLogs.bulkInsert(convertedProductLogs),
      db.classifications.bulkInsert(convertedClassifications),
      db.classificationOnProducts.bulkInsert(convertedClassificationOnProducts),
    ]).then((result) => {
      const [
        products,
        customers,
        suppliers,
        productLogs,
        classifications,
        classificationOnProducts,
      ] = result;
      return {
        products,
        customers,
        suppliers,
        productLogs,
        classifications,
        classificationOnProducts,
      };
    }),
  );
};

export default fetchBackendData;
