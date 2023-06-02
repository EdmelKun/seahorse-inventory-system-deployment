import { Classification, PrismaClient, Products } from '@prisma/client';
import { Mutations } from '../types/mutation';
import {
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from './customer/customerCrud';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from './products/productsCrud';
import {
  addSupplier,
  deleteSupplier,
  updateSupplier,
} from './supplier/supplierCrud';
import {
  addProductLogs,
  deleteProductLogs,
  updateProductLogs,
} from './productLogs/productLogsCrud';
import {
  addClassification,
  deleteClassification,
  updateClassification,
} from './classification/classificationCrud';
import {
  addClassificationOnProduct,
  deleteClassificationOnProduct,
  updateClassificationOnProduct,
} from './classificationOnProducts/classificationOnProductCrud';

const mutate = async (mutation: Mutations, dbClient: PrismaClient) =>
  Promise.all([
    Promise.all(
      mutation.products.map(async (product) => {
        const { id, action, ...data } = product;
        switch (action) {
          case 'ADD':
            return addProduct({ id, ...data }, dbClient);
          case 'UPDATE':
            return updateProduct({ id, ...data }, dbClient);
          case 'DELETE':
            return deleteProduct(id, dbClient);
          default:
            throw new Error('INVALID QUERY');
        }
      }),
    ),

    Promise.all(
      mutation.customers.map(async (customer) => {
        const { id, action, createdAt, updatedAt, ...data } = customer;

        switch (action) {
          case 'ADD':
            return addCustomer(data, dbClient);
          case 'UPDATE':
            return updateCustomer({ id, ...data }, dbClient);
          case 'DELETE':
            return deleteCustomer(id, dbClient);
          default:
            throw new Error('INVALID QUERY');
        }
      }),
    ),
    Promise.all(
      mutation.suppliers.map(async (supplier) => {
        const { id, action, createdAt, updatedAt, ...data } = supplier;

        switch (action) {
          case 'ADD':
            return addSupplier(data, dbClient);
          case 'UPDATE':
            return updateSupplier({ id, ...data }, dbClient);
          case 'DELETE':
            return deleteSupplier(id, dbClient);
          default:
            throw new Error('INVALID QUERY');
        }
      }),
    ),
    Promise.all(
      mutation.classifications.map(async (classification) => {
        const { id, action, ...data } = classification;

        switch (action) {
          case 'ADD':
            return addClassification({ id, ...data }, dbClient);
          case 'UPDATE':
            return updateClassification({ id, ...data }, dbClient);
          case 'DELETE':
            return deleteClassification(id, dbClient);
          default:
            throw new Error('INVALID QUERY');
        }
      }),
    ),
  ]).then(
    ([
      productResults,
      customerResults,
      supplierResults,
      classificationResults,
    ]) =>
      Promise.all([
        Promise.all(
          mutation.classificationOnProducts.map((classification) => {
            const { id, action, ...data } = classification;

            switch (action) {
              case 'ADD': {
                const products = productResults.reduce<Products[]>(
                  (accumulator, current) => {
                    if (current.success && current.data !== null) {
                      return [...accumulator, current.data];
                    }
                    return accumulator;
                  },
                  [],
                );
                const classifications = classificationResults.reduce<
                  Classification[]
                >((accumulator, current) => {
                  if (current.success && current.data !== null) {
                    return [...accumulator, current.data];
                  }
                  return accumulator;
                }, []);

                return addClassificationOnProduct(
                  classification,
                  dbClient,
                  products,
                  classifications,
                );
              }

              case 'UPDATE':
                return updateClassificationOnProduct({ id, ...data }, dbClient);
              case 'DELETE':
                return deleteClassificationOnProduct(id, dbClient);
              default:
                throw new Error('INVALID QUERY');
            }
          }),
        ),
        Promise.all(
          mutation.productLogs.map(async (productLogs) => {
            const { id, action, createdAt, updatedAt, ...data } = productLogs;
            switch (action) {
              case 'ADD': {
                const products = productResults.reduce<Products[]>(
                  (accumulator, current) => {
                    if (current.success && current.data !== null) {
                      return [...accumulator, current.data];
                    }
                    return accumulator;
                  },
                  [],
                );
                return addProductLogs(data, dbClient, products);
              }
              case 'UPDATE':
                return updateProductLogs({ id, ...data }, dbClient);
              case 'DELETE':
                return deleteProductLogs(id, dbClient);
              default:
                throw new Error('INVALID QUERY');
            }
          }),
        ),
      ]).then(([classificationOnProductResults, productLogsResult]) => ({
        products: productResults,
        productLogs: productLogsResult,
        customers: customerResults,
        suppliers: supplierResults,
        classifications: classificationResults,
        classificationOnProducts: classificationOnProductResults,
      })),
  );

export default mutate;
