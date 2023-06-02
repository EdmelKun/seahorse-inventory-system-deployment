import { Suppliers } from '@prisma/client';
import db from '../../../prisma/client';
import { queryAllSuppliers, querySupplierById } from './supplierQuery';

describe('Supplier Query Functions', () => {
  const supplier: Suppliers = {
    id: 4,
    contactName: 'Kevin',
    businessName: 'AYA Inc.',
    contactNum: '+63123456789',
    emailAddress: 'aya.inc@gmail.com',
    country: 'Phil',
    province: 'Roxas',
    municipality: 'Roxas city',
    street: 'High way drive',
    zipCode: 6021,

    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when querying all suppliers', async () => {
    jest.spyOn(db.suppliers, 'findMany').mockResolvedValue([supplier]);

    await expect(queryAllSuppliers()).resolves.toEqual([supplier]);
  });

  it('works when querying a specific product', async () => {
    jest.spyOn(db.suppliers, 'findUnique').mockResolvedValue(supplier);

    await expect(querySupplierById(1)).resolves.toEqual(supplier);
  });
});
