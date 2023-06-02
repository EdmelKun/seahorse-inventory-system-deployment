import db from '../../../prisma/client';

export async function queryAllSuppliers() {
  return db.suppliers.findMany({ where: { active: true } });
}

export async function querySupplierById(supplierId: number) {
  return db.suppliers
    .findUnique({
      where: {
        id: supplierId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
