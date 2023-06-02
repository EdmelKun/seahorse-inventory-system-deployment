import { PrismaClient } from '@prisma/client';
import { CreateSupplier, UpdateSupplier } from '../../types/suppliers';

export async function addSupplier(
  supplierInput: CreateSupplier,
  dbClient: PrismaClient,
) {
  return dbClient.suppliers
    .create({
      data: supplierInput,
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: { id: Date.now(), ...supplierInput },
    }));
}

export async function deleteSupplier(
  supplierId: number,
  dbClient: PrismaClient,
) {
  return dbClient.suppliers
    .findUnique({
      where: {
        id: supplierId,
      },
    })
    .then((result) =>
      dbClient.suppliers
        .update({
          where: {
            id: supplierId,
          },
          data: {
            contactName: `INACTIVE-${result!.contactName}-${supplierId}`,
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

export async function updateSupplier(
  supplierData: UpdateSupplier,
  dbClient: PrismaClient,
) {
  return dbClient.suppliers
    .update({
      where: {
        id: supplierData.id,
      },
      data: {
        ...supplierData,
        updatedAt: new Date(),
      },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({ success: false, err, data: supplierData }));
}
