import { RxCollection, RxJsonSchema } from 'rxdb';
import { ClassificationOnProductsDocType } from '../../../types/classificationOnProducts';

export type ClassificationOnProductsCollection =
  RxCollection<ClassificationOnProductsDocType>;

export const classificationOnProductsSchema: RxJsonSchema<ClassificationOnProductsDocType> =
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
    },
    required: ['id', 'productId', 'classificationId'],
  };
