import { Router } from 'express';
import calculator from './calculator';

const router = Router();
router.post('/', calculator);

export default router;
