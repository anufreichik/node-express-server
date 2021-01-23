import { Router } from 'express';
import create from './create';
import bookGetById from './getById';
import deleteById from './delete';
import search from './search';
import updateById from './update';
const router = Router();

router.post('/', create); //POST localhost:5000/book/
router.post('/search', search); //POST localhost:5000/book/search
router.get('/:bookId', bookGetById); //GET
router.delete('/:bookId', deleteById); //delete
router.patch('/:bookId', updateById); //update
export default router;
