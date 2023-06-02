import {
  Classification,
  ClassificationOnProducts,
  PrismaClient,
  Products,
} from '@prisma/client';
import { CreateClassificationOnProduct } from '../../types/classificationOnProducts';

export async function addClassificationOnProduct(
  classificationOnProductInput: CreateClassificationOnProduct,
  dbClient: PrismaClient,
  newProducts?: (Products & { tempId?: number })[],
  newClassifications?: (Classification & { tempId?: number })[],
) {
  const product = newProducts?.find((e) =>
    e.tempId ? e.tempId === classificationOnProductInput.productId : false,
  );
  const classification = newClassifications?.find((e) =>
    e.tempId
      ? e.tempId === classificationOnProductInput.classificationId
      : false,
  );
  return dbClient.classificationOnProducts
    .create({
      data: {
        productId: product
          ? product.id
          : classificationOnProductInput.productId,
        classificationId: classification
          ? classification.id
          : classificationOnProductInput.classificationId,
        active: true,
      },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: { id: Date.now(), ...classificationOnProductInput },
    }));
}

export async function deleteClassificationOnProduct(
  classificationOnProductId: number,
  dbClient: PrismaClient,
) {
  return dbClient.classificationOnProducts
    .findUnique({
      where: { id: classificationOnProductId },
    })
    .then((result) =>
      dbClient.classificationOnProducts
        .update({
          where: { id: classificationOnProductId },
          data: {
            active: false,
            updatedAt: new Date(),
          },
        })
        .then((data) => ({
          success: true,
          data,
        }))
        .catch((err) => ({ success: false, err, data: result })),
    );
}

export async function updateClassificationOnProduct(
  classificationOnProductData: ClassificationOnProducts,
  dbClient: PrismaClient,
) {
  const { id, createdAt, updatedAt, ...restOfData } =
    classificationOnProductData;

  return dbClient.classificationOnProducts
    .update({
      where: { id },
      data: {
        ...restOfData,
        updatedAt: new Date(),
      },
    })

    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: classificationOnProductData,
    }));
}
