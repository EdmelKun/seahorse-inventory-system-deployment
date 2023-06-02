import { RxCollection, RxJsonSchema } from 'rxdb';
import { ClassificationDocType } from '../../../types/classification';

export type ClassificationCollection = RxCollection<ClassificationDocType>;

export const classificationSchema: RxJsonSchema<ClassificationDocType> = {
  title: 'classification schema',
  description: 'classification a product',
  version: 0,
  keyCompression: false,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    name: {
      type: 'string',
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
  required: ['id', 'name'],
};
