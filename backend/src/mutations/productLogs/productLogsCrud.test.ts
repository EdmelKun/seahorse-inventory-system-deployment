import { ProductLogs } from '@prisma/client';
import db from '../../../prisma/client';
import {
  addProductLogs,
  deleteProductLogs,
  updateProductLogs,
} from './productLogsCrud';

describe('productLogsCrud.ts File', () => {
  describe('Products Mutation functions', () => {
    const productLogs: ProductLogs = {
      id: 4,
      productId: 1,
      previousStoreStock: 20,
      previousWarehouseStock: 30,
      previousRetailPrice: 20,
      previousWholesalePrice: 20,

      updatedStoreStock: 20,
      updatedWarehouseStock: 20,
      updatedRetailPrice: 20,
      updatedWholesalePrice: 20,
      date: new Date('11-10-2022'),

      active: true,
      createdAt: new Date('11-10-2022'),
      updatedAt: new Date('11-10-2022'),
    };

    it('works when adding a new productLogs', async () => {
      jest.spyOn(db.productLogs, 'create').mockResolvedValue(productLogs);

      await expect(addProductLogs(productLogs, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          productId: 1,
          previousStoreStock: 20,
          previousWarehouseStock: 30,
          previousRetailPrice: 20,
          previousWholesalePrice: 20,
          updatedStoreStock: 20,
          updatedWarehouseStock: 20,
          updatedRetailPrice: 20,
          updatedWholesalePrice: 20,
          date: new Date('11-10-2022'),

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('11-10-2022'),
        },
      });
    });

    it('works when deleting a productLogs', async () => {
      jest.spyOn(db.productLogs, 'findUnique').mockResolvedValue(productLogs);
      jest.spyOn(db.productLogs, 'update').mockResolvedValue({
        id: 4,
        productId: 1,
        previousStoreStock: 20,
        previousWarehouseStock: 30,
        previousRetailPrice: 20,
        previousWholesalePrice: 20,

        updatedStoreStock: 20,
        updatedWarehouseStock: 20,
        updatedRetailPrice: 20,
        updatedWholesalePrice: 20,
        date: new Date('11-10-2022'),

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('12-10-2022'),
      });

      await expect(deleteProductLogs(4, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          productId: 1,
          previousStoreStock: 20,
          previousWarehouseStock: 30,
          previousRetailPrice: 20,
          previousWholesalePrice: 20,
          updatedStoreStock: 20,
          updatedWarehouseStock: 20,
          updatedRetailPrice: 20,
          updatedWholesalePrice: 20,
          date: new Date('11-10-2022'),

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('12-10-2022'),
        },
      });
    });

    it('works when updating a productLogs', async () => {
      jest.spyOn(db.productLogs, 'update').mockResolvedValue({
        ...productLogs,
        updatedAt: new Date('12-10-2022'),
      });

      await expect(updateProductLogs(productLogs, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          productId: 1,
          previousStoreStock: 20,
          previousWarehouseStock: 30,
          previousRetailPrice: 20,
          previousWholesalePrice: 20,
          updatedStoreStock: 20,
          updatedWarehouseStock: 20,
          updatedRetailPrice: 20,
          updatedWholesalePrice: 20,
          date: new Date('11-10-2022'),

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('12-10-2022'),
        },
      });
    });
  });
});
