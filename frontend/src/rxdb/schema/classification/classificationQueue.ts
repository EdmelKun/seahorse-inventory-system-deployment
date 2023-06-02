import { RxJsonSchema, RxCollection } from 'rxdb';

export type ClassificationQueueDocType = {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  action: 'ADD' | 'DELETE' | 'UPDATE';
};

export type ClassificationQueueCollection =
  RxCollection<ClassificationQueueDocType>;

export const classificationQueueSchema: RxJsonSchema<ClassificationQueueDocType> =
  {
    title: 'classification Queue schema',
    description: 'classification a product Queue',
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
      action: {
        type: 'string',
      },
    },
    required: ['id', 'name'],
  };
