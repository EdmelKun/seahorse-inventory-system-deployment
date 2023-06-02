import { Products } from '@prisma/client';
import db from '../../../prisma/client';
import { addProduct, deleteProduct, updateProduct } from './productsCrud';

describe('productsCrud.ts File', () => {
  describe('Products Mutation functions', () => {
    const product: Products = {
      id: 4,
      name: 'Karen',
      warehouseStock: 12,
      storeStock: 8,
      retailPrice: 10000,
      wholesaleAmount: 12,
      wholesalePrice: 12333,
      lowstockAlert: 1,
      brand: 'Brnd',
      description: 'Trusted by Many',

      active: true,
      createdAt: new Date('11-10-2022'),
      updatedAt: new Date('11-10-2022'),
    };

    it('works when adding a new product', async () => {
      jest.spyOn(db.products, 'create').mockResolvedValue(product);

      await expect(addProduct(product, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          name: 'Karen',
          warehouseStock: 12,
          storeStock: 8,
          retailPrice: 10000,
          wholesaleAmount: 12,
          wholesalePrice: 12333,
          lowstockAlert: 1,
          brand: 'Brnd',
          description: 'Trusted by Many',
          tempId: 4,
          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('11-10-2022'),
        },
      });
    });

    it('works when deleting a product', async () => {
      jest.spyOn(db.products, 'findUnique').mockResolvedValue(product);
      jest.spyOn(db.products, 'update').mockResolvedValue({
        id: 4,
        name: 'INACTIVE-Karen-4',
        warehouseStock: 12,
        storeStock: 8,
        retailPrice: 10000,
        wholesaleAmount: 12,
        wholesalePrice: 12333,
        lowstockAlert: 1,
        brand: 'Brnd',
        description: 'Trusted by Many',
        active: false,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date(),
      });

      jest.spyOn(db.productLogs, 'updateMany').mockResolvedValue({ count: 1 });

      await expect(deleteProduct(4, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          name: 'INACTIVE-Karen-4',
          warehouseStock: 12,
          storeStock: 8,
          retailPrice: 10000,
          wholesaleAmount: 12,
          wholesalePrice: 12333,
          lowstockAlert: 1,
          brand: 'Brnd',
          description: 'Trusted by Many',
          active: false,
          createdAt: new Date('11-10-2022'),
          updatedAt: expect.any(Date),
        },
      });
    });

    it('works when updataing a product', async () => {
      jest
        .spyOn(db.products, 'update')
        .mockResolvedValue({ ...product, updatedAt: new Date('12-10-2022') });

      await expect(updateProduct(product, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          name: 'Karen',
          warehouseStock: 12,
          storeStock: 8,
          retailPrice: 10000,
          wholesaleAmount: 12,
          wholesalePrice: 12333,
          lowstockAlert: 1,
          brand: 'Brnd',
          description: 'Trusted by Many',

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('12-10-2022'),
        },
      });
    });
  });
});
