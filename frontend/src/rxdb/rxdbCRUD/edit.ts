/* eslint-disable no-underscore-dangle */
import {
  RxdbCollections,
  Collections,
  QueueCollections,
} from '../../types/rxdbCrudTypes';

const updateFromRxdb = (
  dataInput: RxdbCollections,
  collection: Collections,
  queueCollection: QueueCollections,
) =>
  collection
    .findOne({ selector: { id: dataInput.id } })
    .exec()
    .then((data: any) => {
      if (data) {
        const updatedProduct = {
          ...data.toJSON(),
          ...dataInput,
          updatedAt: new Date(),
        };
        if (collection) {
          return data.update({ $set: updatedProduct });
        }
      }
      throw new Error('NO DATA UPDATED');
    })
    .then(() =>
      queueCollection
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
          return queueCollection.insert({
            ...(dataInput as any),
            action: 'UPDATE',
            updatedAt: new Date(),
          });
        }),
    );

export default updateFromRxdb;
