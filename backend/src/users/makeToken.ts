import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Credentials } from '../types/user';

dotenv.config();

export const makeToken = async (
  credential: Credentials,
  dbClient: PrismaClient,
) => {
  const { username, password } = credential;
  if (
    username === process.env.MASTER_USERNAME &&
    password === process.env.MASTER_KEY
  ) {
    return {
      token: jwt.sign(
        {
          username,
          id: 0,
          admin: true,
        },
        process.env.TOKEN_SECRET ?? 'secret',
        {
          expiresIn: '24h',
        },
      ),
      username,
      id: 0,
      admin: true,
    };
  }

  return dbClient.user
    .findUnique({
      where: { username },
    })
    .then((result) => {
      if (result) {
        return bcrypt
          .compare(password, result.password)
          .then((passwordMatch) => {
            const jwtSecret = process.env.TOKEN_SECRET ?? 'secret';

            if (passwordMatch) {
              return {
                token: jwt.sign(
                  {
                    username: result.username,
                    id: result.id,
                    admin: result.admin,
                  },
                  jwtSecret,
                  {
                    expiresIn: '24h',
                  },
                ),
                username: result.username,
                id: result.id,
                admin: result.admin,
              };
            }
            return undefined;
          });
      }
      return undefined;
    });
};

export default makeToken;
