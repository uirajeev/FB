import { Router } from 'express';
import { home, register, activateAccount, login }  from '../controller/user.js';

const router = Router();

router.get('/', home);
router.post('/register', register);
router.post('/activate', activateAccount);
router.post('/login', login);

export default router;