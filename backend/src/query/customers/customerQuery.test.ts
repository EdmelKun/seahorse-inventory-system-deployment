import { Customers, Sex } from '@prisma/client';
import db from '../../../prisma/client';
import { queryAllCustomers, queryCustomerById } from './customerQuery';

describe('Customer Query Functions', () => {
  const customer: Customers = {
    id: 1,
    firstName: 'johnny',
    lastName: 'Bravo',
    sex: Sex.MALE,
    contactNum: '+6312345789',
    emailAddress: 'johnny@gmail.com',
    country: 'PHLI',
    province: 'Iloilo',
    municipality: 'Pavia',
    street: 'Sesami',
    zipCode: 1001,

    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when querying all customers', async () => {
    jest.spyOn(db.customers, 'findMany').mockResolvedValue([customer]);

    await expect(queryAllCustomers()).resolves.toEqual([customer]);
  });

  it('works when querying a specific customers', async () => {
    jest.spyOn(db.customers, 'findUnique').mockResolvedValue(customer);

    await expect(queryCustomerById(1)).resolves.toEqual(customer);
  });
});
