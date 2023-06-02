import { Router } from 'express';
import { Server } from 'socket.io';
import { jwtVerify } from '../users/verifyToken';
import queryAll, { queryAllTables } from '../query/queryAll';
import mutate from '../mutations/mutationsFunction';
import db from '../../prisma/client';

const router = Router();

const dataRouter = (io: Server) => {
  router.post('/queryAll', (req, res) =>
    jwtVerify(req).then((tokenResult) => {
      if (tokenResult.success) {
        return queryAll(req.body)
          .then((result) => res.json({ success: true, data: result }))
          .catch((err) => res.json({ success: false, err }));
      }

      return res.status(401).json(tokenResult);
    }),
  );

  router.post('/queryAllTables', (req, res) =>
    jwtVerify(req).then((tokenResult) => {
      if (tokenResult.success) {
        return queryAllTables()
          .then((result) => res.json({ success: true, data: result }))
          .catch((err) => res.json({ success: false, err }));
      }
      return res.status(401).json(tokenResult);
    }),
  );

  router.post('/mutate', (req, res) =>
    jwtVerify(req).then((tokenResult) => {
      if (tokenResult.success && tokenResult.data?.admin) {
        return mutate(req.body, db)
          .then((result) => {
            io.emit('update', { message: 'backed mutated' });
            return res.json({ success: true, ...result });
          })
          .catch((err) => res.json({ success: false, err }));
      }

      return res.status(401).json({ ...tokenResult, success: false });
    }),
  );
  return router;
};

export default dataRouter;
