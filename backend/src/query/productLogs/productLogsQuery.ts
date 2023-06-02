import db from '../../../prisma/client';

export async function queryAllProductLogs() {
  return db.productLogs.findMany({
    select: {
      id: true,
      productId: true,
      previousStoreStock: true,
      previousWarehouseStock: true,
      previousRetailPrice: true,
      previousWholesalePrice: true,
      updatedStoreStock: true,
      updatedWarehouseStock: true,
      updatedRetailPrice: true,
      updatedWholesalePrice: true,
      date: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },

    where: { active: true },
  });
}

export async function queryProductLogById(productLogId: number) {
  return db.productLogs
    .findUnique({
      select: {
        id: true,
        productId: true,
        previousStoreStock: true,
        previousWarehouseStock: true,
        previousRetailPrice: true,
        previousWholesalePrice: true,
        updatedStoreStock: true,
        updatedWarehouseStock: true,
        updatedRetailPrice: true,
        updatedWholesalePrice: true,
        date: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },

      where: {
        id: productLogId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
