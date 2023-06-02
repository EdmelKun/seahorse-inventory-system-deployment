import {
  Classification,
  ClassificationOnProducts,
  Products,
} from '@prisma/client';
import {
  addClassificationOnProduct,
  deleteClassificationOnProduct,
  updateClassificationOnProduct,
} from './classificationOnProductCrud';
import db from '../../../prisma/client';

describe('ClassificationOnProducts Mutation functions', () => {
  const classificationOnProduct: ClassificationOnProducts = {
    id: 1,
    productId: 1,
    classificationId: 1,
    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when adding a new ClassificationOnProduct', async () => {
    jest
      .spyOn(db.classificationOnProducts, 'create')
      .mockResolvedValue(classificationOnProduct);

    await expect(
      addClassificationOnProduct(
        classificationOnProduct,
        db,
        [] as Products[],
        [] as Classification[],
      ),
    ).resolves.toEqual({
      success: true,
      data: classificationOnProduct,
    });
  });

  it('works when deleting a ClassificationOnProduct', async () => {
    jest
      .spyOn(db.classificationOnProducts, 'findUnique')
      .mockResolvedValue(classificationOnProduct);
    jest.spyOn(db.classificationOnProducts, 'update').mockResolvedValue({
      ...classificationOnProduct,
      active: false,
      updatedAt: new Date('12-10-2022'),
    });

    await expect(deleteClassificationOnProduct(1, db)).resolves.toEqual({
      success: true,
      data: {
        ...classificationOnProduct,
        active: false,
        updatedAt: new Date('12-10-2022'),
      },
    });
  });

  it('works when updating a ClassificationOnProduct', async () => {
    jest.spyOn(db.classificationOnProducts, 'update').mockResolvedValue({
      ...classificationOnProduct,
      updatedAt: new Date('12-10-2022'),
    });

    await expect(
      updateClassificationOnProduct(classificationOnProduct, db),
    ).resolves.toEqual({
      success: true,
      data: {
        ...classificationOnProduct,
        updatedAt: new Date('12-10-2022'),
      },
    });
  });
});
