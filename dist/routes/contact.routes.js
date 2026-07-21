import { Router } from 'express';
import * as ContactController from '../controllers/contact.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
const router = Router();
router.use(isAuthenticated);
router.get('/contacts', ContactController.list);
router.get('/contacts/create', ContactController.createForm);
router.post('/contacts', ContactController.create);
router.get('/contacts/edit/:id', ContactController.editForm);
router.post('/contacts/edit/:id', ContactController.update);
router.post('/contacts/delete/:id', ContactController.remove);
export default router;
//# sourceMappingURL=contact.routes.js.map