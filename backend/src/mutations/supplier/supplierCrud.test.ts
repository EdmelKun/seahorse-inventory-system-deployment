import { Suppliers } from '@prisma/client';
import db from '../../../prisma/client';
import { addSupplier, deleteSupplier, updateSupplier } from './supplierCrud';

describe('SuppliersCrud.ts File', () => {
  describe('Suppliers Mutation functions', () => {
    const supplier: Suppliers = {
      id: 4,
      contactName: 'Mr. Jov',
      businessName: 'Mr. Jov FISHING INC.',
      contactNum: '0912345678',
      emailAddress: 'jov_fishing@gmail.com',
      country: 'PH',
      province: 'Iloilo',
      municipality: 'Oton',
      street: 'Pogi street',
      zipCode: 5000,

      active: true,
      createdAt: new Date('11-10-2022'),
      updatedAt: new Date('11-10-2022'),
    };

    it('works when adding a new Supplier', async () => {
      jest.spyOn(db.suppliers, 'create').mockResolvedValue(supplier);

      await expect(addSupplier(supplier, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          contactName: 'Mr. Jov',
          businessName: 'Mr. Jov FISHING INC.',
          contactNum: '0912345678',
          emailAddress: 'jov_fishing@gmail.com',
          country: 'PH',
          province: 'Iloilo',
          municipality: 'Oton',
          street: 'Pogi street',
          zipCode: 5000,

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('11-10-2022'),
        },
      });
    });

    it('works when deleting a Supplier', async () => {
      jest.spyOn(db.suppliers, 'findUnique').mockResolvedValue(supplier);
      jest.spyOn(db.suppliers, 'update').mockResolvedValue({
        id: 4,
        contactName: 'INACTIVE-Mr. Jov-4',
        businessName: 'Mr. Jov FISHING INC.',
        contactNum: '0912345678',
        emailAddress: 'jov_fishing@gmail.com',
        country: 'PH',
        province: 'Iloilo',
        municipality: 'Oton',
        street: 'Pogi street',
        zipCode: 5000,

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('12-10-2022'),
      });

      await expect(deleteSupplier(4, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          contactName: 'INACTIVE-Mr. Jov-4',
          businessName: 'Mr. Jov FISHING INC.',
          contactNum: '0912345678',
          emailAddress: 'jov_fishing@gmail.com',
          country: 'PH',
          province: 'Iloilo',
          municipality: 'Oton',
          street: 'Pogi street',
          zipCode: 5000,

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('12-10-2022'),
        },
      });
    });

    it('works when updataing a Supplier', async () => {
      jest.spyOn(db.suppliers, 'update').mockResolvedValue({
        ...supplier,
        updatedAt: new Date('12-10-2022'),
      });

      await expect(updateSupplier(supplier, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          contactName: 'Mr. Jov',
          businessName: 'Mr. Jov FISHING INC.',
          contactNum: '0912345678',
          emailAddress: 'jov_fishing@gmail.com',
          country: 'PH',
          province: 'Iloilo',
          municipality: 'Oton',
          street: 'Pogi street',
          zipCode: 5000,

          active: true,
          createdAt: new Date('11-10-2022'),
          updatedAt: new Date('12-10-2022'),
        },
      });
    });
  });
});
