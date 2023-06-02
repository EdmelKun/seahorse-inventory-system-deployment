import { Request, Response } from 'express';
import dotenv from 'dotenv';
import makeToken from './makeToken';
import db from '../../prisma/client';

dotenv.config();

const login = (req: Request, res: Response) =>
  makeToken(req.body, db)
    .then((result) => {
      if (result) {
        const { token, ...restOfData } = result;
        return res.header('Authorization', `Bearer ${token}`).json({
          token: `Bearer ${token}`,
          data: restOfData,
          success: true,
        });
      }
      return res.json({ success: false, error: 'Invaild credential' });
    })
    .catch(() => res.json({ success: false, error: 'Invaild credential' }));
export default login;
