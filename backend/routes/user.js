import { Router } from 'express';
import { register, activateAccount, login } from '../controller/user.js';

const router = Router();

router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);

export default router;