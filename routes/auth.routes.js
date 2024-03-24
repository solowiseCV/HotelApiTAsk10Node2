import express from 'express'
import { logoutUser, signIn, signUp } from '../controllers/auth.controller.js';
import { validateSignIn, validateSignUp } from '../middleware/validation.middleware.js';

const router = express.Router();


router.post("/auth/signUp",validateSignUp,signUp);
router.post("/auth/signIn",validateSignIn,signIn);
router.post("/auth/logout",logoutUser);



export default router ;