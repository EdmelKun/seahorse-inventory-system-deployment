import { Router } from 'express';
import login from '../users/login';
import verifyToken from '../users/verifyToken';

const router = Router();

router.post('/', login);
router.get('/verifyToken', verifyToken);

export default router;
