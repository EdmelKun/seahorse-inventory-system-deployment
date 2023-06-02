import { RxCollection, RxJsonSchema } from 'rxdb';

export type CustomerQueueDocType = {
  id: string;
  firstName: string;
  lastName: string;
  sex: 'MALE' | 'FEMALE';
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

export type CustomerQueueCollection = RxCollection<CustomerQueueDocType>;

export const customerQueueSchema: RxJsonSchema<CustomerQueueDocType> = {
  title: 'customer schema',
  description: 'describes a customer',
  version: 0,
  keyCompression: false,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    sex: {
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
  required: ['id', 'firstName', 'action'],
};
