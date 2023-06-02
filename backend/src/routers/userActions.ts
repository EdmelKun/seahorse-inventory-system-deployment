import { Router } from 'express';
import db from '../../prisma/client';
import { queryAllUsers, queryUserById } from '../query/users/userQueries';
import { jwtVerify } from '../users/verifyToken';
import { addUser, deleteUser, updateUser } from '../mutations/user/userCrud';

const router = Router();

router.post('/getAll', (req, res) => {
  jwtVerify(req).then((result) => {
    if (
      result.success &&
      result.data &&
      result.data.username === process.env.MASTER_USERNAME
    ) {
      return queryAllUsers()
        .then((users) => res.json({ success: true, data: users }))
        .catch((err) => res.json({ success: false, err }));
    }

    return res.status(401).json(result);
  });
});

router.post('/byId', (req, res) => {
  const { userId } = req.body;
  queryUserById(userId)
    .then((result) => res.json({ success: true, data: result }))
    .catch((err) =>
      res.json({
        success: false,
        err,
      }),
    );
});

router.post('/', (req, res) => {
  const { masterKey, action, data } = req.body;

  return jwtVerify(req).then((result) => {
    if (result.data && result.data.username === process.env.MASTER_USERNAME) {
      if (masterKey !== process.env.MASTER_KEY) {
        return res
          .status(401)
          .json({ success: false, err: 'INVALID MASTER KEY' });
      }
      return new Promise((resolve, rej) => {
        switch (action) {
          case 'ADD': {
            const { confirmPassword, ...newData } = data;

            if (confirmPassword === data.password) {
              resolve(addUser(newData, db));
            } else if (process.env.MASTER_USERNAME === data.username) {
              rej(new Error('A USER WITH THAT USERNAME ALREADY EXISTS'));
            } else {
              rej(new Error('Password do not match'));
            }
            break;
          }
          case 'UPDATE':
            resolve(updateUser(data, db));
            break;

          case 'DELETE':
            resolve(deleteUser(data.userId, db));
            break;

          default:
            rej(new Error('INVALID QUERY'));
            break;
        }
      })
        .then((response) => res.json(response))
        .catch((err) => {
          res.json({ success: false, err });
        });
    }
    return res.status(401).json({ success: false, err: 'UNAUTHORIZED' });
  });
});

export default router;
