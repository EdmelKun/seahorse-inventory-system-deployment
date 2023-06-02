import { queryAllClassifications } from './classification/classificationQuery';
import { queryAllClassificationOnProducts } from './classificationOnProducts/classificationOnProductsQuery';
import { queryAllCustomers } from './customers/customerQuery';
import { queryAllProductLogs } from './productLogs/productLogsQuery';
import { queryAllProducts } from './products/productQuery';
import { queryAllSuppliers } from './suppliers/supplierQuery';

type queryType =
  | 'PRODUCTS'
  | 'CUSTOMERS'
  | 'SUPPLIERS'
  | 'PRODUCTLOGS'
  | 'CLASSIFICATIONS'
  | 'CLASSIFICATION_ON_PRODUCTS';

const queryAll = (type: queryType) => {
  switch (type) {
    case 'PRODUCTS':
      return queryAllProducts();
    case 'SUPPLIERS':
      return queryAllSuppliers();
    case 'CUSTOMERS':
      return queryAllCustomers();
    case 'PRODUCTLOGS':
      return queryAllProductLogs();
    case 'CLASSIFICATIONS':
      return queryAllClassifications();
    case 'CLASSIFICATION_ON_PRODUCTS':
      return queryAllClassificationOnProducts();
    default:
      return Promise.reject(new Error('INVAILD QUERY'));
  }
};

export const queryAllTables = async () => ({
  products: await queryAllProducts(),
  customers: await queryAllCustomers(),
  suppliers: await queryAllSuppliers(),
  productLogs: await queryAllProductLogs(),
  classifications: await queryAllClassifications(),
  classificationOnProducts: await queryAllClassificationOnProducts(),
});

export default queryAll;
