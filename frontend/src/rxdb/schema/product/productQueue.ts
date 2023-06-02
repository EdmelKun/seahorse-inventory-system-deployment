import { RxCollection, RxJsonSchema } from 'rxdb';

export type ProductQueueDocType = {
  id: string;
  name: string;
  storeStock: number;
  warehouseStock: number;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleAmount: number;
  lowstockAlert: number;
  description: string;
  brand: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  action: 'ADD' | 'DELETE' | 'UPDATE';
};

export type ProductQueueCollection = RxCollection<ProductQueueDocType>;

export const productQueueSchema: RxJsonSchema<ProductQueueDocType> = {
  title: 'product queue schema',
  description: 'describes a product queue',
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
    storeStock: {
      type: 'integer',
    },
    warehouseStock: {
      type: 'integer',
    },
    retailPrice: {
      type: 'integer',
    },
    wholesalePrice: {
      type: 'integer',
    },
    wholesaleAmount: {
      type: 'integer',
    },
    lowstockAlert: {
      type: 'integer',
    },
    description: {
      type: 'string',
    },
    brand: {
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
  required: ['id', 'name', 'action'],
};
