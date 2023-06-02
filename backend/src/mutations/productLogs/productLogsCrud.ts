import { PrismaClient, Products } from '@prisma/client';
import { CreateProductLogs, UpdateProductLogs } from '../../types/productLogs';

export async function addProductLogs(
  productLogsInput: CreateProductLogs,
  dbClient: PrismaClient,
  newProducts?: (Products & { tempId?: number })[],
) {
  const product = newProducts?.find((e) =>
    e.tempId ? e.tempId === productLogsInput.productId : false,
  );
  const { productId, ...restOfData } = productLogsInput;
  return dbClient.productLogs
    .create({
      data: {
        productId: product ? product.id : productId,
        ...restOfData,
      },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: { id: Date.now(), ...productLogsInput },
    }));
}

export async function deleteProductLogs(
  productLogsId: number,
  dbClient: PrismaClient,
) {
  return dbClient.productLogs
    .findUnique({
      where: {
        id: productLogsId,
      },
    })
    .then((result) =>
      dbClient.productLogs
        .update({
          where: {
            id: productLogsId,
          },
          data: {
            active: false,
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
          data: { id: Date.now(), ...result },
        })),
    );
}

export async function updateProductLogs(
  productLogsData: UpdateProductLogs,
  dbClient: PrismaClient,
) {
  return dbClient.productLogs
    .update({
      where: {
        id: productLogsData.id,
      },
      data: {
        ...productLogsData,
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
      data: { ...productLogsData },
    }));
}
