import { Customers } from '@prisma/client';
import db from '../../../prisma/client';
import { addCustomer, deleteCustomer, updateCustomer } from './customerCrud';

describe('customersCrud.ts File', () => {
  describe('customers Mutation functions', () => {
    const customer: Customers = {
      id: 4,
      firstName: 'Joviemar',
      lastName: 'Pogi',
      sex: 'MALE',
      contactNum: '0912345678',
      emailAddress: 'jov_pogi@gmail.com',
      country: 'PH',
      province: 'Iloilo',
      municipality: 'Oton',
      street: 'Pogi street',
      zipCode: 5000,

      active: true,
      createdAt: new Date('11-10-2022'),
      updatedAt: new Date('11-10-2022'),
    };

    it('works when adding a new customer', async () => {
      jest.spyOn(db.customers, 'create').mockResolvedValue(customer);

      await expect(addCustomer(customer, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          firstName: 'Joviemar',
          lastName: 'Pogi',
          sex: 'MALE',
          contactNum: '0912345678',
          emailAddress: 'jov_pogi@gmail.com',
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

    it('works when deleting a customer', async () => {
      jest.spyOn(db.customers, 'findUnique').mockResolvedValue(customer);
      jest.spyOn(db.customers, 'update').mockResolvedValue({
        id: 4,
        firstName: 'INACTIVE-Joviemar-4',
        lastName: 'Pogi',
        sex: 'MALE',
        contactNum: '0912345678',
        emailAddress: 'jov_pogi@gmail.com',
        country: 'PH',
        province: 'Iloilo',
        municipality: 'Oton',
        street: 'Pogi street',
        zipCode: 5000,

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('12-10-2022'),
      });

      await expect(deleteCustomer(4, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          firstName: 'INACTIVE-Joviemar-4',
          lastName: 'Pogi',
          sex: 'MALE',
          contactNum: '0912345678',
          emailAddress: 'jov_pogi@gmail.com',
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

    it('works when updataing a customer', async () => {
      jest.spyOn(db.customers, 'update').mockResolvedValue({
        ...customer,
        updatedAt: new Date('12-10-2022'),
      });

      await expect(updateCustomer(customer, db)).resolves.toEqual({
        success: true,
        data: {
          id: 4,
          firstName: 'Joviemar',
          lastName: 'Pogi',
          sex: 'MALE',
          contactNum: '0912345678',
          emailAddress: 'jov_pogi@gmail.com',
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
