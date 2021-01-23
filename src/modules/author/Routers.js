import { Router } from 'express';
import create from './create';
import authorGetById from './getById';
import deleteById from './delete';
import search from './search';
import updateById from './update';
const router = Router();

router.post('/', create); //POST localhost:5000/author/
router.post('/search', search); //POST localhost:5000/author/search
router.get('/:authorId', authorGetById); //GET
router.delete('/:authorId', deleteById); //delete
router.patch('/:authorId', updateById); //update
export default router;
