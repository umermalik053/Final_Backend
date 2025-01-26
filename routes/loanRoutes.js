import express from 'express';
import { loanController } from '../controller/loanController.js';

export const loanRoutes = express.Router();

// Import the controller functions

loanRoutes.post('/create', loanController);


