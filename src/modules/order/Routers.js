import { Router } from 'express';
import create from './create';
import orderGetById from './getById';
import deleteById from './delete';
import search from './search';
import updateById from './update';
const router = Router();

router.post('/', create); //POST localhost:5000/order/
router.post('/search', search); //POST localhost:5000/order/search
router.get('/:orderId', orderGetById); //GET
router.delete('/:orderId', deleteById); //delete
router.patch('/:orderId', updateById); //update
export default router;
