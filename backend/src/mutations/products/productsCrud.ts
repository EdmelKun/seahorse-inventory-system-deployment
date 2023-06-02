import { PrismaClient, Products } from '@prisma/client';

export async function addProduct(
  productInput: Products,
  dbClient: PrismaClient,
) {
  const { id, createdAt, updatedAt, ...restOfData } = productInput;
  return dbClient.products
    .create({
      data: restOfData,
    })
    .then((data) => ({
      success: true,
      data: {
        ...data,
        tempId: id,
      },
    }))
    .catch((err) => ({
      success: false,
      err,
      data: productInput,
    }));
}

export async function deleteProduct(productId: number, dbClient: PrismaClient) {
  return dbClient.products
    .findUnique({
      where: {
        id: productId,
      },
    })
    .then((result) =>
      dbClient.products
        .update({
          where: {
            id: productId,
          },
          data: {
            name: `INACTIVE-${result!.name}-${productId}`,
            active: false,
            updatedAt: new Date(),
          },
        })
        .then((data) =>
          dbClient.productLogs
            .updateMany({
              where: {
                productId,
              },
              data: {
                active: false,
                updatedAt: new Date(),
              },
            })
            .then(() => ({
              success: true,
              data,
            })),
        )
        .catch((err) => ({ success: false, err, data: result })),
    );
}

export async function updateProduct(
  productData: Products,
  dbClient: PrismaClient,
) {
  const { id, createdAt, updatedAt, ...restOfData } = productData;
  return dbClient.products
    .update({
      where: {
        id,
      },
      data: {
        ...restOfData,
        updatedAt: new Date(),
      },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({ success: false, err, data: productData }));
}
