import bcrypt from 'bcrypt';
import db from '../../prisma/client';
import makeToken from './makeToken';

describe('makeToken.ts', () => {
  const user = {
    id: 100,
    username: 'jonny',
    password: '$2b$10$uubNEIe.XsHG2aieAvlviOpxnN5py1r.sesg3.6jlZR6h1YcPapGK',
    admin: true,

    active: true,
    createdAt: new Date('11-10-2022'),
    updatedAt: new Date('11-10-2022'),
  };

  describe('User token generator', () => {
    it('Returns a token when the username exist in the database and if the password provided matches the hashed in the db', async () => {
      jest.spyOn(db.user, 'findUnique').mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      await expect(
        makeToken({ username: 'jonny', password: '123' }, db),
      ).resolves.toBeDefined();
    });

    it('Returns undefined when the username does not exist in the database', async () => {
      jest.spyOn(db.user, 'findUnique').mockResolvedValue(null);
      await expect(
        makeToken({ username: 'jodnny123', password: '123' }, db),
      ).resolves.toBeUndefined();
    });

    it('Returns undefined when the password does not match in the database', async () => {
      jest.spyOn(db.user, 'findUnique').mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await expect(
        makeToken({ username: 'jodnny123', password: '123' }, db),
      ).resolves.toBeUndefined();
    });
  });
});
