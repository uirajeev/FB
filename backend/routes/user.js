import { Router } from 'express';
import {
  register,
  activateAccount,
  login,
  auth,
  findUser,
  resendVerificationEmail,
  sendResetEmail,
  verifyCode,
  resetPassword
} from '../controller/user.js';
import { authUser } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);
router.post('/auth', auth);
router.post('/resendverifemail', authUser, resendVerificationEmail);
router.post('/finduser', findUser);
router.post('/sendcode', sendResetEmail);
router.post('/verifycode', verifyCode);
router.post('/resetpassword', resetPassword);

export default router;
