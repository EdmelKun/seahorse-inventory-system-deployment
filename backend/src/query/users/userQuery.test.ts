import { User } from '@prisma/client';
import db from '../../../prisma/client';
import { queryAllUsers, queryUserById } from './userQueries';

describe('User Query Functions', () => {
  const user: User = {
    id: 1,
    username: 'jonny',
    password: '$2b$10$uubNEIe.XsHG2aieAvlviOpxnN5py1r.sesg3.6jlZR6h1YcPapGK',
    admin: true,

    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when querying all users', async () => {
    jest.spyOn(db.user, 'findMany').mockResolvedValue([user]);

    await expect(queryAllUsers()).resolves.toEqual([user]);
  });

  it('works when querying a specific product', async () => {
    jest.spyOn(db.user, 'findUnique').mockResolvedValue(user);

    await expect(queryUserById(1)).resolves.toEqual(user);
  });
});
