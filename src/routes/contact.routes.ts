import { validate } from '../middlewares/validation.middleware.js';
import { contactSchema } from '../schemas/contact.schema.js';
import { Router, type Router as RouterType } from 'express';
import * as ContactController from '../controllers/contact.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router: RouterType = Router();

router.use(isAuthenticated);

router.get('/contacts', ContactController.list);
router.get('/contacts/create', ContactController.createForm);
router.post('/contacts', validate(contactSchema), ContactController.create);
router.post('/contacts/edit/:id', validate(contactSchema), ContactController.update);
router.get('/contacts/edit/:id', ContactController.editForm);
router.post('/contacts/delete/:id', ContactController.remove);

export default router;
