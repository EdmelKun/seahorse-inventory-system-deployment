import { RxCollection, RxJsonSchema } from 'rxdb';
import { SupplierDocType } from '../../../types/supplier';

export type SupplierCollection = RxCollection<SupplierDocType>;

export const supplierSchema: RxJsonSchema<SupplierDocType> = {
  title: 'supplier schema',
  description: 'describes a supplier',
  version: 0,
  keyCompression: false,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    contactName: {
      type: 'string',
    },
    businessName: {
      type: 'string',
    },
    contactNum: {
      type: 'string',
    },
    emailAddress: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    province: {
      type: 'string',
    },
    municipality: {
      type: 'string',
    },
    street: {
      type: 'string',
    },
    zipCode: {
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
  required: ['id', 'businessName'],
};
