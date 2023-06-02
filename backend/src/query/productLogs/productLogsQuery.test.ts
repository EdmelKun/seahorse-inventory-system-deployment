import { ProductLogs } from '@prisma/client';
import db from '../../../prisma/client';
import { queryAllProductLogs, queryProductLogById } from './productLogsQuery';

describe('Product Logs Query Functions', () => {
  const productLog: ProductLogs = {
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

  it('works when querying all productLogs', async () => {
    jest.spyOn(db.productLogs, 'findMany').mockResolvedValue([productLog]);

    await expect(queryAllProductLogs()).resolves.toEqual([productLog]);
  });

  it('works when querying a specific product', async () => {
    jest.spyOn(db.productLogs, 'findUnique').mockResolvedValue(productLog);

    await expect(queryProductLogById(1)).resolves.toEqual(productLog);
  });
});
