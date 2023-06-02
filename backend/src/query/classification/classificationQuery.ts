import db from '../../../prisma/client';

export async function queryAllClassifications() {
  return db.classification.findMany({ where: { active: true } });
}

export async function queryClassificationById(classificationId: number) {
  return db.classification
    .findUnique({
      where: {
        id: classificationId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
