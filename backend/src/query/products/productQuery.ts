import db from '../../../prisma/client';

export async function queryAllProducts() {
  return db.products.findMany({ where: { active: true } });
}

export async function queryProductById(productId: number) {
  return db.products
    .findUnique({
      where: {
        id: productId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
