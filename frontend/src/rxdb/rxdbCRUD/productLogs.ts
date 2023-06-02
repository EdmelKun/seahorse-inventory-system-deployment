import { RxDatabase } from 'rxdb';
import { ProductDocType } from '../../types/product';
import { Collections } from '../initializeRxdb';

const isLoggable = (a: ProductDocType, b: ProductDocType) =>
  a.storeStock !== b.storeStock ||
  a.warehouseStock !== b.warehouseStock ||
  a.retailPrice !== b.retailPrice ||
  a.wholesalePrice !== b.wholesalePrice;

const logProduct = (
  db: RxDatabase<Collections, any, any>,
  newProduct: ProductDocType,
  oldProduct: ProductDocType,
) => {
  if (isLoggable(newProduct, oldProduct)) {
    return db.productLogs
      .insert({
        id: `${Date.now()}`,
        productId: Number(newProduct.id),
        previousStoreStock: oldProduct.storeStock,
        previousWarehouseStock: oldProduct.warehouseStock,
        previousRetailPrice: oldProduct.retailPrice,
        previousWholesalePrice: oldProduct.wholesalePrice,

        updatedStoreStock: newProduct.storeStock,
        updatedWarehouseStock: newProduct.warehouseStock,
        updatedRetailPrice: newProduct.retailPrice,
        updatedWholesalePrice: newProduct.wholesalePrice,
        active: true,

        date: new Date(),

        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((result) =>
        db.productLogsQueue
          .insert({
            id: `${Date.now()}`,
            productId: Number(newProduct.id),
            previousStoreStock: oldProduct.storeStock,
            previousWarehouseStock: oldProduct.warehouseStock,
            previousRetailPrice: oldProduct.retailPrice,
            previousWholesalePrice: oldProduct.wholesalePrice,
            active: true,

            action: 'ADD',
            updatedStoreStock: newProduct.storeStock,
            updatedWarehouseStock: newProduct.warehouseStock,
            updatedRetailPrice: newProduct.retailPrice,
            updatedWholesalePrice: newProduct.wholesalePrice,
            date: new Date(),

            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .then(() => result),
      );
  }
  return Promise.resolve(undefined);
};
export default logProduct;
