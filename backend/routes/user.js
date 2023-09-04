import { Router } from 'express';
import { home, register }  from '../controller/user.js';

const router = Router();

router.get('/', home);
router.post('/register', register);

export default router;