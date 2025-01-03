import { Router } from 'express';
import { authUser } from '../middlewares/auth.js';

import { createPost, getAllPosts } from '../controller/post.js';

const router = Router();

router.post('/create', authUser, createPost);
router.get('/all', authUser, getAllPosts);

export default router;
