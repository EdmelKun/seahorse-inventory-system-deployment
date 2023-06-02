import { RxCollection, RxJsonSchema } from 'rxdb';

export type ProductLogsQueueDocType = {
  id: string;
  productId: number;

  previousStoreStock: number;
  previousWarehouseStock: number;
  previousRetailPrice: number;
  previousWholesalePrice: number;

  updatedStoreStock: number;
  updatedWarehouseStock: number;
  updatedRetailPrice: number;
  updatedWholesalePrice: number;
  date: Date;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  action: 'ADD' | 'DELETE' | 'UPDATE';
};

export type ProductLogsQueueCollection = RxCollection<ProductLogsQueueDocType>;

export const productLogsQueueSchema: RxJsonSchema<ProductLogsQueueDocType> = {
  title: 'productlogsqueue schema',
  description: 'describes a productlogsqueue',
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
    previousStoreStock: {
      type: 'number',
    },
    previousWarehouseStock: {
      type: 'number',
    },
    previousRetailPrice: {
      type: 'number',
    },
    previousWholesalePrice: {
      type: 'number',
    },
    updatedStoreStock: {
      type: 'number',
    },
    updatedWarehouseStock: {
      type: 'number',
    },
    updatedRetailPrice: {
      type: ' number',
    },
    updatedWholesalePrice: {
      type: 'number',
    },
    date: {
      type: 'date',
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
  required: ['id', 'productId', 'action'],
};
