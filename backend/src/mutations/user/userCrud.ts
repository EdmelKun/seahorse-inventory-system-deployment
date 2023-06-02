import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUser, UpdateUser } from '../../types/user';

export async function addUser(userInput: CreateUser, dbClient: PrismaClient) {
  return bcrypt.hash(userInput.password, 10).then((hashedPassword) =>
    dbClient.user
      .create({ data: { ...userInput, password: hashedPassword } })
      .then((data) => ({ success: true, data }))
      .catch((err) => ({
        success: false,
        err,
        data: { id: Date.now(), ...userInput },
      })),
  );
}

export async function updateUser(userData: UpdateUser, dbClient: PrismaClient) {
  return bcrypt.hash(userData.password, 10).then((hashedPassword) =>
    dbClient.user
      .update({
        where: {
          id: userData.id,
        },
        data: {
          username: userData.username,
          password: hashedPassword,
          updatedAt: new Date(),
          admin: userData.admin,
        },
      })
      .then((data) => ({
        success: true,
        data,
      }))
      .catch((err) => ({
        success: false,
        err,
        data: userData,
      })),
  );
}

export async function deleteUser(userId: number, dbClient: PrismaClient) {
  return dbClient.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((result) =>
      dbClient.user
        .update({
          where: { id: userId },
          data: {
            username: `INACTIVE-${result!.username}-${userId}`,
            active: false,
            updatedAt: new Date(),
          },
        })
        .then((data) => ({ success: true, data }))
        .catch((err) => ({ success: false, err, data: result })),
    );
}
