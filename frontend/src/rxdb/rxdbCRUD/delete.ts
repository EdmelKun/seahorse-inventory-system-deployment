import {
  Collections,
  RxdbCollections,
  QueueCollections,
} from '../../types/rxdbCrudTypes';

const deleteFromRxdb = (
  dataInput: RxdbCollections,
  collection: Collections,
  queueCollection: QueueCollections,
) =>
  collection
    .findOne({ selector: { id: dataInput.id } })
    .exec()
    .then((data: any) => {
      if (data) {
        return data.remove();
      }
      throw new Error('NO DATA');
    })
    .then(() =>
      queueCollection
        .findOne({ selector: { id: dataInput.id, active: true } })
        .exec()
        .then((result: any) => {
          if (result) {
            if (result.action === 'ADD') {
              return result.remove();
            }
            const updatedData = {
              ...result.toJSON(),
              active: false,
              action: 'DELETE',
              updatedAt: new Date(),
            };
            return result.update({ $set: updatedData });
          }

          return queueCollection.insert({
            ...(dataInput as any),
            action: 'DELETE',
            active: false,
            updatedAt: new Date(),
          });
        }),
    );

export default deleteFromRxdb;
