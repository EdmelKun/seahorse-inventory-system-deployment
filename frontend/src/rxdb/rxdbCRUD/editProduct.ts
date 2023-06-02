/* eslint-disable no-underscore-dangle */
import { RxDatabase } from 'rxdb';
import { ProductDocType } from '../../types/product';
import { Collections } from '../initializeRxdb';
import logProduct from './productLogs';

const updateProductFromRxdb = (
  db: RxDatabase<Collections, any, any>,
  dataInput: ProductDocType,
) =>
  db.products
    .findOne({ selector: { id: dataInput.id } })
    .exec()
    .then((data) => {
      if (data && !data.deleted) {
        const updatedProduct = {
          ...data.toJSON(),
          ...dataInput,
          updatedAt: new Date(),
        };

        return logProduct(db, updatedProduct, data.toJSON()).then(() =>
          data.update({ $set: updatedProduct }),
        );
      }
      throw new Error('NO DATA UPDATED');
    })
    .then(() =>
      db.productsQueue
        .findOne({ selector: { id: dataInput.id } })
        .exec()
        .then((result: any) => {
          if (result && !result._deleted) {
            const updatedData = {
              ...result.toJSON(),
              ...dataInput,
              updatedAt: new Date(),
            };
            return result.update({ $set: updatedData });
          }
          return db.productsQueue.insert({
            ...(dataInput as any),
            action: 'UPDATE',
            updatedAt: new Date(),
          });
        }),
    );

export default updateProductFromRxdb;
