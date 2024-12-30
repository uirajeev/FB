import { Router } from 'express';
import { validateImage } from '../middlewares/upload.js';

import { uploadImages } from '../controller/upload.js';

const router = Router();

router.post('/images', validateImage, uploadImages);

export default router;