import { User } from '@prisma/client';
import db from '../../../prisma/client';
import { addUser, deleteUser, updateUser } from './userCrud';

describe('User Mutation functions', () => {
  const user: User = {
    id: 4,
    username: 'jov_fishing',
    password: 'securepassword',
    admin: false,
    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  it('works when adding a new User', async () => {
    jest.spyOn(db.user, 'create').mockResolvedValue(user);

    await expect(addUser(user, db)).resolves.toEqual({
      success: true,
      data: user,
    });
  });

  it('works when deleting a User', async () => {
    jest.spyOn(db.user, 'findUnique').mockResolvedValue(user);
    jest.spyOn(db.user, 'update').mockResolvedValue({
      ...user,
      username: `INACTIVE-${user.username}-${user.id}`,
      active: false,
      updatedAt: new Date('11-10-2022'),
    });

    await expect(deleteUser(user.id, db)).resolves.toEqual({
      success: true,
      data: {
        ...user,
        username: `INACTIVE-${user.username}-${user.id}`,
        active: false,
        updatedAt: new Date('11-10-2022'),
      },
    });
  });

  it('works when updating a User', async () => {
    jest.spyOn(db.user, 'update').mockResolvedValue({
      ...user,
      admin: true,
      updatedAt: new Date('11-10-2022'),
    });

    await expect(updateUser(user, db)).resolves.toEqual({
      success: true,
      data: {
        ...user,
        admin: true,
        updatedAt: new Date('11-10-2022'),
      },
    });
  });
});
