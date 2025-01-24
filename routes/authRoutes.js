import express from 'express';
import { forgotPasswordController, loginController, registerController, resendEmailController, resetPasswordController, verifyEmailController } from '../controller/authController.js';

export const authRoutes = express.Router();

// Import the controller functions

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/forgot-password', forgotPasswordController);
authRoutes.post('/reset-password/:token', resetPasswordController);
authRoutes.get('/verify-email/:token', verifyEmailController);
authRoutes.get('/resend-verification-email/:email', resendEmailController);

