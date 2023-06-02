import { PrismaClient } from '@prisma/client';
import { CreateCustomer, UpdateCustomer } from '../../types/customer';

export async function addCustomer(
  customerInput: CreateCustomer,
  dbClient: PrismaClient,
) {
  return dbClient.customers
    .create({
      data: customerInput,
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({
      success: false,
      err,
      data: { id: Date.now(), ...customerInput },
    }));
}

export async function deleteCustomer(
  customerId: number,
  dbClient: PrismaClient,
) {
  return dbClient.customers
    .findUnique({
      where: {
        id: customerId,
      },
    })
    .then((result) =>
      dbClient.customers
        .update({
          where: {
            id: customerId,
          },
          data: {
            firstName: `INACTIVE-${result!.firstName}-${customerId}`,
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

export async function updateCustomer(
  customerData: UpdateCustomer,
  dbClient: PrismaClient,
) {
  return dbClient.customers
    .update({
      where: {
        id: customerData.id,
      },
      data: {
        ...customerData,
        updatedAt: new Date(),
      },
    })
    .then((data) => ({
      success: true,
      data,
    }))
    .catch((err) => ({ success: false, err, data: customerData }));
}
