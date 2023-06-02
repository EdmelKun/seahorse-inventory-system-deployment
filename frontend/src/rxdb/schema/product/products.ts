import { RxCollection, RxJsonSchema } from 'rxdb';
import { ProductDocType } from '../../../types/product';

export type ProductCollection = RxCollection<ProductDocType>;

export const productSchema: RxJsonSchema<ProductDocType> = {
  title: 'product schema',
  description: 'describes a product',
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
  },
  required: ['id', 'name'],
};
