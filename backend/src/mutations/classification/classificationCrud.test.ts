import { Classification } from '@prisma/client';
import db from '../../../prisma/client';
import {
  addClassification,
  deleteClassification,
  updateClassification,
} from './classificationCrud';

jest.mock('../classificationOnProducts/classificationOnProductCrud', () => ({
  deleteClassificationOnProduct: jest.fn(),
}));

describe('Classification Mutation functions', () => {
  const classification: Classification = {
    id: 1,
    name: 'Sample Classification',
    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when adding a new Classification', async () => {
    jest.spyOn(db.classification, 'create').mockResolvedValue(classification);

    expect(await addClassification(classification, db)).toEqual({
      success: true,
      data: { ...classification, tempId: 1 },
    });
  });

  it('works when updating a Classification', async () => {
    const updatedClassification = {
      ...classification,
      updatedAt: new Date('12-10-2022'),
    };
    jest
      .spyOn(db.classification, 'update')
      .mockResolvedValue(updatedClassification);

    expect(await updateClassification(updatedClassification, db)).toEqual({
      success: true,
      data: updatedClassification,
    });
  });

  it('works when deleting a Classification', async () => {
    const inactiveClassification = {
      ...classification,
      name: `INACTIVE-${classification.name}-1`,
      active: false,
      updatedAt: new Date('12-10-2022'),
    };
    jest.spyOn(db.classificationOnProducts, 'findMany').mockResolvedValue([]);
    jest
      .spyOn(db.classification, 'findUnique')
      .mockResolvedValue(classification);
    jest
      .spyOn(db.classification, 'update')
      .mockResolvedValue(inactiveClassification);

    expect(await deleteClassification(1, db)).toEqual({
      success: true,
      data: inactiveClassification,
    });
  });
});
