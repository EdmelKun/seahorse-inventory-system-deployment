import {
  queryAllClassificationOnProducts,
  queryClassificationOnProductById,
} from './classificationOnProductsQuery';
import db from '../../../prisma/client';

describe('ClassificationOnProducts Query Functions', () => {
  const classificationOnProducts = {
    id: 1,
    productId: 2,
    classificationId: 3,
    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when querying all ClassificationOnProducts', async () => {
    jest
      .spyOn(db.classificationOnProducts, 'findMany')
      .mockResolvedValue([classificationOnProducts]);

    await expect(queryAllClassificationOnProducts()).resolves.toEqual([
      classificationOnProducts,
    ]);
  });

  it('works when querying a specific ClassificationOnProduct', async () => {
    jest
      .spyOn(db.classificationOnProducts, 'findUnique')
      .mockResolvedValue(classificationOnProducts);

    await expect(queryClassificationOnProductById(1)).resolves.toEqual(
      classificationOnProducts,
    );
  });
});
