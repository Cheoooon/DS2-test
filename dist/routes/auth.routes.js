import { validate } from '../middlewares/validation.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
const router = Router();
router.get('/register', (req, res) => res.render('register'));
router.post('/register', validate(registerSchema), AuthController.register);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
export default router;
//# sourceMappingURL=auth.routes.js.map