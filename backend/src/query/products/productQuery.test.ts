import { Products } from '@prisma/client';
import db from '../../../prisma/client';
import { queryAllProducts, queryProductById } from './productQuery';

describe('Products Query Functions', () => {
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

  it('works when querying all products', async () => {
    jest.spyOn(db.products, 'findMany').mockResolvedValue([product]);

    await expect(queryAllProducts()).resolves.toEqual([product]);
  });

  it('works when querying a specific product', async () => {
    jest.spyOn(db.products, 'findUnique').mockResolvedValue(product);

    await expect(queryProductById(1)).resolves.toEqual(product);
  });
});
