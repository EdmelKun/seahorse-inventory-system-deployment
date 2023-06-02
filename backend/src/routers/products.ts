import { Router, Request, Response } from 'express';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../mutations/products/productsCrud';
import db from '../../prisma/client';
import {
  queryAllProducts,
  queryProductById,
} from '../query/products/productQuery';
import { jwtVerify } from '../users/verifyToken';

const router = Router();

router.post('/', (req, res) =>
  jwtVerify(req).then((tokenResult) => {
    if (tokenResult.success) {
      return queryAllProducts()
        .then((result) => res.json({ success: true, data: result }))
        .catch((err) => res.json({ success: false, err }));
    }

    return res.status(401).json(tokenResult);
  }),
);
router.post('/byId', (req, res) =>
  queryProductById(Number(req.body.id))
    .then((result) => res.json({ success: true, data: result }))
    .catch((err) => res.json({ success: false, err })),
);
router.post('/add', (req: Request, res: Response) =>
  addProduct(req.body, db)
    .then((result) => res.json({ success: true, data: result }))
    .catch((err) => res.json({ success: false, err })),
);
router.post('/delete', (req, res) =>
  deleteProduct(Number(req.body.id), db)
    .then((result) => res.json({ success: true, data: result }))
    .catch((err) => res.json({ success: false, err })),
);
router.post('/update', (req, res) =>
  updateProduct(req.body, db)
    .then((result) => res.json({ success: true, data: result }))
    .catch((err) => res.json({ success: false, err })),
);

export default router;
