import { Router } from 'express';
import { authUser } from '../middlewares/auth.js';

import { createPost } from '../controller/post.js';

const router = Router();

router.post('/create', authUser, createPost);

export default router;
