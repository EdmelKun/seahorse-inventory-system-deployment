import {
  Collections,
  NewDataInput,
  QueueCollections,
} from '../../types/rxdbCrudTypes';

export const addFromRxdb = (
  dataInput: NewDataInput,
  collection: Collections,
  queueCollection: QueueCollections,
) => {
  const newData = {
    ...dataInput,
    id: `${Date.now()}`,
    active: true,
    createdAt: Date(),
    updatedAt: Date(),
  } as any;

  return collection
    .insert(newData)
    .then(async () => queueCollection.insert({ ...newData, action: 'ADD' }));
};

export default addFromRxdb;
