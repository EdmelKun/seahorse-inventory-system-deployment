import { RxCollection, RxJsonSchema } from 'rxdb';
import { ProductLogsDocType } from '../../../types/productLogs';

export type ProductLogsCollection = RxCollection<ProductLogsDocType>;

export const productLogsSchema: RxJsonSchema<ProductLogsDocType> = {
  title: 'productlogs schema',
  description: 'describes a productlogs',
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
  },
  required: ['id', 'productId'],
};
