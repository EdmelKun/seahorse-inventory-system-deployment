import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { addRxPlugin } from 'rxdb';
// import { RxDBCleanupPlugin, runCleanupAfterDelete } from 'rxdb/plugins/cleanup';
import { Mutations } from '../types/rxdbCrudTypes';
import rxdb from './initializeRxdb';
import addFromRxdb from './rxdbCRUD/add';
import deleteFromRxdb from './rxdbCRUD/delete';
import updateFromRxdb from './rxdbCRUD/edit';
import updateProductFromRxdb from './rxdbCRUD/editProduct';
import { addClassificationOnProductsFromRxdb } from './rxdbCRUD/addClassificationsOnProducts';

addRxPlugin(RxDBUpdatePlugin);
// addRxPlugin(RxDBCleanupPlugin);

const mutateRxdb = (m: Mutations) => {
  if (m.table === 'PRODUCT' && m.type === 'UPDATE') {
    return rxdb.then((db) => updateProductFromRxdb(db, m.dataInput));
  }
  if (m.table === 'CLASSIFICATION_ON_PRODUCTS' && m.type === 'ADD') {
    return rxdb.then((db) =>
      addClassificationOnProductsFromRxdb(db, m.dataInput),
    );
  }

  return rxdb
    .then((db) => {
      switch (m.table) {
        case 'PRODUCT':
          return {
            collection: db.products,
            queueCollection: db.productsQueue,
          };
        case 'CUSTOMER':
          return {
            collection: db.customers,
            queueCollection: db.customersQueue,
          };
        case 'SUPPLIER':
          return {
            collection: db.suppliers,
            queueCollection: db.suppliersQueue,
          };
        case 'CLASSIFICATION':
          return {
            collection: db.classifications,
            queueCollection: db.classificationsQueue,
          };
        case 'CLASSIFICATION_ON_PRODUCTS':
          return {
            collection: db.classificationOnProducts,
            queueCollection: db.classificationOnProductsQueue,
          };
        default:
          throw new Error('Invalid table');
      }
    })
    .then((db) => {
      switch (m.type) {
        case 'ADD':
          return addFromRxdb(m.dataInput, db.collection, db.queueCollection);
        case 'UPDATE':
          return updateFromRxdb(m.dataInput, db.collection, db.queueCollection);
        case 'DELETE':
          return deleteFromRxdb(m.dataInput, db.collection, db.queueCollection);
        default:
          throw new Error('Invalid table');
      }
    });
};

export const destroyRxdb = () =>
  rxdb.then((db) =>
    Promise.all([
      db.products.find().remove(),
      db.productsQueue.find().remove(),
      db.productLogs.find().remove(),
      db.productLogsQueue.find().remove(),
      db.suppliersQueue.find().remove(),
      db.customers.find().remove(),
      db.customersQueue.find().remove(),
      db.classifications.find().remove(),
      db.classificationsQueue.find().remove(),
      db.classificationOnProducts.find().remove(),
      db.classificationOnProductsQueue.find().remove(),
    ]),
  );

export default mutateRxdb;
