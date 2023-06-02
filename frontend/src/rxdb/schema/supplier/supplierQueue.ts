import { RxCollection, RxJsonSchema } from 'rxdb';

export type SupplierQueueDocType = {
  id: string;
  contactName?: string;
  businessName: string;
  contactNum?: string;
  emailAddress?: string;
  country?: string;
  province?: string;
  municipality?: string;
  street?: string;
  zipCode?: number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  action: 'ADD' | 'DELETE' | 'UPDATE';
};

export type SupplierQueueCollection = RxCollection<SupplierQueueDocType>;

export const supplierQueueSchema: RxJsonSchema<SupplierQueueDocType> = {
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
    action: {
      type: 'string',
    },
  },
  required: ['id', 'businessName', 'action'],
};
