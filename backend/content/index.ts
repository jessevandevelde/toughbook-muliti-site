import { Router } from 'express';
import {
  getAllWebsiteContentHandler,
  getWebsiteContentByDomainHandler,
  getWebsiteContentByIdHandler,
} from './content.handlers.js';

const router = Router();

router.get('/websites', getAllWebsiteContentHandler);
router.get('/websites/:websiteId', getWebsiteContentByIdHandler);
router.get('/by-domain/:domain', getWebsiteContentByDomainHandler);

export default router;
