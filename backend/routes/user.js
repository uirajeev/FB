import { Router } from 'express';
import { register, activateAccount, login, auth } from '../controller/user.js';
import { authUser } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);
router.post('/auth', authUser, auth);

export default router;