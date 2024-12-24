import { Router } from 'express';
import { register, activateAccount, login, auth } from '../controller/user.js';
import { authUser } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);

export default router;