import { RxCollection, RxJsonSchema } from 'rxdb';
import { CustomerDocType } from '../../../types/customer';

export type CustomerCollection = RxCollection<CustomerDocType>;

export const customerSchema: RxJsonSchema<CustomerDocType> = {
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
  },
  required: ['id', 'firstName'],
};
