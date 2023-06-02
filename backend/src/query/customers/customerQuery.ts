import db from '../../../prisma/client';

export async function queryAllCustomers() {
  return db.customers.findMany({ where: { active: true } });
}

export async function queryCustomerById(customerId: number) {
  return db.customers
    .findUnique({
      where: {
        id: customerId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
