import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import MessageController from './app/controllers/MessageController';
import AuthController from './app/controllers/AuthController';

const router = Router();

//List all users
router.get('/users', authMiddleware, UserController.list);
//Register
router.post('/users', UserController.create);
//Update password
router.put('/users', authMiddleware, UserController.update);
//Delete user (soft delete)
router.delete('/users', authMiddleware, UserController.delete);

//Login authentication
router.post('/auth', AuthController.authenticate);

//List messages
router.get('/message', authMiddleware, MessageController.list);
//Post Message
router.post('/message', authMiddleware, MessageController.create);
//Edit Message
router.put('/message', authMiddleware, MessageController.update);
//Delete Message
router.delete('/message', authMiddleware, MessageController.delete);

export default router;