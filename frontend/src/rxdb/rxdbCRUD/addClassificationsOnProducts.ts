/* eslint-disable no-underscore-dangle */
import { RxDatabase } from 'rxdb';

import { Collections } from '../initializeRxdb';

import { NewClassificationOnProductsDocType } from '../../types/rxdbCrudTypes';

export const addClassificationOnProductsFromRxdb = (
  db: RxDatabase<Collections, any, any>,
  dataInput: NewClassificationOnProductsDocType,
) => {
  const { classificationId, productId } = dataInput;

  const newData = {
    id: `${Date.now()}`,
    classificationId,
    productId,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.classificationOnProducts
    .findOne({ selector: { classificationId, productId, active: true } })
    .exec()
    .then((data) => {
      if (!data) {
        return db.classificationOnProducts.insert(newData).then(async () =>
          db.classificationOnProductsQueue.insert({
            ...newData,
            action: 'ADD',
          }),
        );
      }
      throw new Error('NO DATA UPDATED On CLASSIFICATION ON PRODUCTS');
    });
};

export default addClassificationOnProductsFromRxdb;
