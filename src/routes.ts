import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import MessageController from './app/controllers/MessageController';
import AuthController from './app/controllers/AuthController';

const router = Router();

//Register
router.post('/users', UserController.store);
//Verify token
router.get('/users', authMiddleware, UserController.index);
//List all users
router.get('/users/list', authMiddleware, UserController.list);

//Get token
router.post('/auth', AuthController.authenticate);

//List messages
router.get('/message', authMiddleware, MessageController.list);
//Post Message
router.post('/message', authMiddleware, MessageController.store);

export default router;