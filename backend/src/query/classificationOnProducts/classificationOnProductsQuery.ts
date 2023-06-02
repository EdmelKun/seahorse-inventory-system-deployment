import db from '../../../prisma/client';

export async function queryAllClassificationOnProducts() {
  return db.classificationOnProducts.findMany({ where: { active: true } });
}

export async function queryClassificationOnProductById(
  classificationOnProductId: number,
) {
  return db.classificationOnProducts
    .findUnique({
      where: {
        id: classificationOnProductId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
