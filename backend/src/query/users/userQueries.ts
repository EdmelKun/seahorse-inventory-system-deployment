import db from '../../../prisma/client';

export async function queryAllUsers() {
  return db.user.findMany({ where: { active: true } });
}

export async function queryUserById(userId: number) {
  return db.user
    .findUnique({
      where: {
        id: userId,
      },
    })
    .then((result) => (result?.active ? result : null));
}
