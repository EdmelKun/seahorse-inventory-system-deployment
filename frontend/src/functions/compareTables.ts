import { DataFromBackend } from '../types/backendData';
import { DataFromRxdb } from '../types/rxdbCrudTypes';
// import { ProductFromBackend, ProductDocType } from '../types/product';

// const isSimilar = (
//   productsFromRxdb: ProductDocType[],
//   productsFromBackend: ProductFromBackend[],
// ) => {
//   if (productsFromRxdb.length === productsFromBackend.length) {
//     return productsFromRxdb.every((e1) =>
//       productsFromBackend.some(
//         (e2) =>
//           e1.id === e2.id.toString() &&
//           e1.updatedAt.getTime() === e2.updatedAt.getTime(),
//       ),
//     );
//   }

//   return false;
// };

// const isSimilar = (
//   DataFromRxdb: RxdbCollections[],
//   DataFromBackend: BackendCollections[],
// ) => {
//   if (DataFromRxdb.length === DataFromBackend.length) {
//     return DataFromRxdb.every((e1) =>
//       DataFromBackend.some(
//         (e2) =>
//           e1.id === e2.id.toString() &&
//           e1.updatedAt.getTime() === e2.updatedAt.getTime(),
//       ),
//     );
//   }

//   return false;
// };
interface Data {
  updatedAt: Date;
}

export const getLatestDate = (data: Data[]) =>
  data.reduce((prev, current) =>
    prev.updatedAt > current.updatedAt ? prev : current,
  ).updatedAt;

export const x = (
  dataFromRxdb: DataFromBackend,
  dataFromBackend: DataFromRxdb,
) => {
  const rxdb = getLatestDate(Array.from(Object.values(dataFromRxdb)).flat());
  const backend = getLatestDate(
    Array.from(Object.values(dataFromBackend)).flat(),
  );

  return rxdb > backend;
};

export default x;
