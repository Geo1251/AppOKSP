import { Router } from 'express';
import PostController from './PostController.js';
import UserController from './UserController.js';

const router = new Router();

router.post('/posts', PostController.create);
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getOne);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.delete);

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/users', UserController.getAllUsers); 

export default router;