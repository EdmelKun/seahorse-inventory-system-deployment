import { Classification, PrismaClient } from '@prisma/client';

import { deleteClassificationOnProduct } from '../classificationOnProducts/classificationOnProductCrud';

export async function addClassification(
  classificationInput: Classification,
  dbClient: PrismaClient,
) {
  const { id, updatedAt, createdAt, ...restOfData } = classificationInput;
  return dbClient.classification
    .create({
      data: restOfData,
    })
    .then((data) => ({
      success: true,
      data: { ...data, tempId: id },
    }))
    .catch((err) => ({
      success: false,
      err,
      data: classificationInput,
    }));
}

export async function updateClassification(
  classificationData: Classification,
  dbClient: PrismaClient,
) {
  const { id, updatedAt, createdAt, ...restOfData } = classificationData;
  return dbClient.classification
    .update({
      where: { id },
      data: { ...restOfData, updatedAt: new Date() },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: classificationData,
    }));
}

export async function deleteClassification(
  classificationId: number,
  dbClient: PrismaClient,
) {
  return dbClient.classificationOnProducts
    .findMany({
      where: { classificationId },
    })
    .then((listOfClassificationOnProducts) =>
      listOfClassificationOnProducts.forEach((e) =>
        deleteClassificationOnProduct(e.id, dbClient),
      ),
    )
    .then(() =>
      dbClient.classification.findUnique({
        where: { id: classificationId },
      }),
    )
    .then((result) =>
      dbClient.classification
        .update({
          where: { id: classificationId },
          data: {
            name: `INACTIVE-${result!.name}-${classificationId}`,
            active: false,
            updatedAt: new Date(),
          },
        })
        .then((data) => ({ success: true, data }))
        .catch((err) => ({ success: false, err, data: result })),
    );
}
