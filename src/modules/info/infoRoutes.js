import { Router } from 'express';
import info from './info';
import { infopost } from './info';
const router = Router();

router.post('/', infopost);
router.get('/', info);

export default router;
