import { Router } from 'express';
import {
  getCmsPage,
  getCmsTreeHandler,
  updateBlockFieldHandler,
  updateBlockItemFieldHandler,
  updateBlockOrderHandler,
} from './cms.handlers.js';

const router = Router();

router.get('/', getCmsPage);
router.get('/tree', getCmsTreeHandler);
router.put('/field/:id', updateBlockFieldHandler);
router.put('/item-field/:id', updateBlockItemFieldHandler);
router.put('/blocks/order', updateBlockOrderHandler);

export default router;
