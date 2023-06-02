import { Sex } from '@prisma/client';

export interface CreateCustomer {
  firstName: string;
  lastName: string;
  sex: Sex;
  contactNum: string;
  emailAddress: string;
  country: string;
  province: string;
  municipality: string;
  street: string;
  zipCode: number;
}

export interface CustomerMutation {
  id: number;
  firstName: string;
  lastName: string;
  sex: Sex;
  contactNum: string;
  emailAddress: string;
  country: string;
  province: string;
  municipality: string;
  street: string;
  zipCode: number;
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCustomer {
  id: number;
  firstName: string;
  lastName: string;
  sex: Sex;
  contactNum: string;
  emailAddress: string;
  country: string;
  province: string;
  municipality: string;
  street: string;
  zipCode: number;
}
