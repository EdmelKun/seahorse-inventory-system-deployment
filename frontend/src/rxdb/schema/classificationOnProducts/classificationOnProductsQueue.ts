import { RxCollection, RxJsonSchema } from 'rxdb';

export type ClassificationOnProductsQueueDocType = {
  id: string;
  productId: number;
  classificationId: number;
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ClassificationOnProductsQueueCollection =
  RxCollection<ClassificationOnProductsQueueDocType>;

export const classificationOnProductsQueueSchema: RxJsonSchema<ClassificationOnProductsQueueDocType> =
  {
    title: 'classificationOnProducts schema',
    description: 'classification a classification On Products',
    version: 0,
    keyCompression: false,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100,
      },
      productId: {
        type: 'number',
      },
      classificationId: {
        type: 'number',
      },
      active: {
        type: 'boolean',
      },
      createdAt: {
        type: 'date',
      },
      updatedAt: {
        type: 'date',
      },
      action: {
        type: 'string',
      },
    },
    required: ['id', 'productId', 'classificationId'],
  };
