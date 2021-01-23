import { Router } from 'express';
import create from './create';
import baseGetById from './getById';
import deleteById from './delete';
import search from './search';
import updateById from './update';
const router = Router();

router.post('/', create); //POST localhost:5000/base/
router.post('/search', search); //POST localhost:5000/base/search
router.get('/:baseId', baseGetById); //GET
router.delete('/:baseId', deleteById); //delete
router.patch('/:baseId', updateById); //update
export default router;
