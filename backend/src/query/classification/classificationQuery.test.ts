import { Classification } from '@prisma/client';
import db from '../../../prisma/client';
import {
  queryAllClassifications,
  queryClassificationById,
} from './classificationQuery';

describe('Classification Query Functions', () => {
  const classification: Classification = {
    id: 1,
    name: 'Example Classification',
    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when querying all active classifications', async () => {
    jest
      .spyOn(db.classification, 'findMany')
      .mockResolvedValue([classification]);

    await expect(queryAllClassifications()).resolves.toEqual([classification]);
  });

  it('works when querying a specific classification', async () => {
    jest
      .spyOn(db.classification, 'findUnique')
      .mockResolvedValue(classification);

    await expect(queryClassificationById(1)).resolves.toEqual(classification);
  });

  it('returns null when querying a specific inactive classification', async () => {
    const inactiveClassification = { ...classification, active: false };
    jest
      .spyOn(db.classification, 'findUnique')
      .mockResolvedValue(inactiveClassification);

    await expect(queryClassificationById(1)).resolves.toBeNull();
  });
});
