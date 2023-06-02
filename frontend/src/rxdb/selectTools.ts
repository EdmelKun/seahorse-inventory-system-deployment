/* eslint-disable no-underscore-dangle */
import { RxDatabase } from 'rxdb';
import rxdb, { Collections } from './initializeRxdb';
import { CollectionTables } from '../types/rxdbCrudTypes';

export const selectAllData2 = (
  table: CollectionTables,
  rxdb2: Promise<RxDatabase<Collections, any, any>>,
) =>
  rxdb2
    .then(async (db) => {
      switch (table) {
        case 'PRODUCT':
          return db.products;
        case 'PRODUCT_QUEUE':
          return db.productsQueue;
        case 'CUSTOMER':
          return db.customers;
        case 'CUSTOMER_QUEUE':
          return db.customersQueue;
        case 'SUPPLIER':
          return db.suppliers;
        case 'SUPPLIER_QUEUE':
          return db.suppliersQueue;
        case 'PRODUCT_LOGS':
          return db.productLogs;
        case 'PRODUCT_LOGS_QUEUE':
          return db.productLogsQueue;
        default:
          throw new Error('table do not exist');
      }
    })
    .then(async (collection) =>
      collection
        .find()
        .exec()
        .then((result) => {
          if (result) {
            return result.map((e) => {
              const { _meta, _deleted, _attachments, _rev, ...tail } = e._data;
              return tail;
            });
          }
          throw new Error('Product not found');
        }),
    );

const selectAllData = (table: CollectionTables) =>
  rxdb
    .then(async (db) => {
      switch (table) {
        case 'PRODUCT':
          return db.products;
        case 'PRODUCT_QUEUE':
          return db.productsQueue;
        case 'CUSTOMER':
          return db.customers;
        case 'CUSTOMER_QUEUE':
          return db.customersQueue;
        case 'SUPPLIER':
          return db.suppliers;
        case 'SUPPLIER_QUEUE':
          return db.suppliersQueue;
        case 'PRODUCT_LOGS':
          return db.productLogs;
        case 'PRODUCT_LOGS_QUEUE':
          return db.productLogsQueue;
        case 'CLASSIFICATION':
          return db.classifications;
        case 'CLASSIFICATION_QUEUE':
          return db.classificationsQueue;
        case 'CLASSIFICATION_ON_PRODUCTS':
          return db.classificationOnProducts;
        case 'CLASSIFICATION_ON_PRODUCTS_QUEUE':
          return db.classificationOnProductsQueue;
        default:
          throw new Error('table do not exist');
      }
    })
    .then(async (collection) =>
      collection
        .find()
        .exec()
        .then((result) => {
          if (result) {
            return result.map((e) => {
              const { _meta, _deleted, _attachments, _rev, ...tail } = e._data;
              return tail;
            });
          }
          throw new Error('Product not found');
        }),
    );

export const findDataById = (id: number, table: CollectionTables) =>
  rxdb
    .then(async (db) => {
      switch (table) {
        case 'PRODUCT':
          return db.products;
        case 'PRODUCT_QUEUE':
          return db.productsQueue;
        case 'CUSTOMER':
          return db.customers;
        case 'CUSTOMER_QUEUE':
          return db.customersQueue;
        case 'SUPPLIER':
          return db.suppliers;
        case 'SUPPLIER_QUEUE':
          return db.suppliersQueue;
        case 'PRODUCT_LOGS':
          return db.productLogs;
        case 'PRODUCT_LOGS_QUEUE':
          return db.productLogsQueue;
        case 'CLASSIFICATION':
          return db.classifications;
        case 'CLASSIFICATION_QUEUE':
          return db.classificationsQueue;
        case 'CLASSIFICATION_ON_PRODUCTS':
          return db.classificationOnProducts;
        case 'CLASSIFICATION_ON_PRODUCTS_QUEUE':
          return db.classificationOnProductsQueue;
        default:
          throw new Error('table do not exist');
      }
    })
    .then((collection) =>
      collection
        .findOne({ selector: { id: id.toString() } })
        .exec()
        .then((result) => {
          if (result) {
            const { _meta, _deleted, _attachments, _rev, ...tail } =
              result._data;
            return tail;
          }
          throw new Error('Product not found');
        }),
    );

export const showAllDetailedProductLogs = (type?: 'QUEUE') =>
  rxdb
    .then(async (db) => {
      if (type === 'QUEUE') {
        return { productLogs: db.productLogsQueue, products: db.products };
      }
      return { productLogs: db.productLogs, products: db.products };
    })
    .then((db) =>
      db.productLogs
        .find()
        .exec()
        .then((result) =>
          Promise.all(
            result.map((log) =>
              db.products
                .findOne({ selector: { id: log.productId.toString() } })
                .exec()
                .then((productDetails) => {
                  if (log && productDetails) {
                    return {
                      ...productDetails._data,
                      ...log._data,
                    };
                  }
                  throw new Error('Product not found');
                }),
            ),
          ),
        ),
    );

export const showDetailedProductLogsById = (id: number) =>
  rxdb.then(async (db) =>
    db.productLogs
      .findOne({ selector: { id: id.toString() } })
      .exec()
      .then((result) => {
        if (result) {
          return db.products
            .findOne({ selector: { id: result.productId.toString() } })
            .exec()
            .then((productDetails) => {
              if (result && productDetails) {
                return {
                  ...productDetails._data,
                  ...result._data,
                };
              }
              throw new Error('Product not found');
            });
        }
        return null;
      }),
  );

export const showClassificationOnProduct = (productId: number) =>
  rxdb.then(async (db) =>
    db.classificationOnProducts
      .find({ selector: { productId } })
      .exec()
      .then((result) => {
        if (result) {
          return Promise.all(
            result.map((e) =>
              db.classifications
                .findOne({ selector: { id: e.classificationId.toString() } })
                .exec()
                .then((classification) => {
                  if (classification) {
                    return classification._data;
                  }
                  throw new Error('Product not found');
                }),
            ),
          );
        }
        return null;
      }),
  );

export const showAllClassificationOnProduct = () =>
  rxdb.then(async (db) =>
    db.classificationOnProducts
      .find()
      .exec()
      .then((result) => {
        if (result) {
          return Promise.all(
            result.map((e) =>
              db.classifications
                .findOne({ selector: { id: e.classificationId.toString() } })
                .exec()
                .then((classification) => {
                  if (classification) {
                    return classification._data;
                  }
                  throw new Error('Product not found');
                }),
            ),
          );
        }
        return null;
      }),
  );

export const showAllProductsOnClassification = (classificationId: number) =>
  rxdb.then(async (db) =>
    db.classificationOnProducts
      .find({ selector: { classificationId, active: true } })
      .exec()
      .then((result) => {
        if (result) {
          return Promise.all(
            result.map((e) =>
              db.products
                .findOne({ selector: { id: e.productId.toString() } })
                .exec()
                .then((product) => {
                  if (product) {
                    return product._data;
                  }
                  throw new Error('Product not found');
                }),
            ),
          );
        }
        throw new Error('Product not found');
      }),
  );

export const getClassificationOnProduct = (
  productId: number,
  classificationId: number,
) =>
  rxdb.then(async (db) =>
    db.classificationOnProducts
      .findOne({ selector: { classificationId, productId, active: true } })
      .exec()
      .then((result) => {
        if (result) {
          return result._data;
        }
        throw new Error('Classification On Product not found');
      }),
  );

export default selectAllData;
