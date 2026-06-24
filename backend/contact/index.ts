import { Router } from 'express';
import { sendContactRequestHandler } from './contact.handlers.js';

const router = Router();

router.post('/', sendContactRequestHandler);

export default router;
