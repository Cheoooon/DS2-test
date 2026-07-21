import { Router, type Router as RouterType } from 'express';
import * as AuthController from '../controllers/auth.controller.js';

const router: RouterType = Router();
router.get('/register', (req, res) => res.render('register'));
router.post('/register', AuthController.register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

export default router;
