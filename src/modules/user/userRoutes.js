import { Router } from 'express';
import userRegister from './userRegister';
import userGetAll from './userGetAll';
import userGetById from './userGetById';
import userUpdateById from './userUpdateById';
import userDeleteById from './userDeleteById';
import userDeleteAll from './userDeleteAll';

const router = Router();

router.post('/', userRegister); //POST localhost:5000/user
router.get('/', userGetAll); //lGET localhost:5000/user
router.get('/:userId', userGetById); //lGET localhost:5000/user/id
//router.get('/:userId/:age', userGetById); //get localhost:5000/user/userid/age - if need two paramenters
router.patch('/:userId', userUpdateById); //PATCH localhost:5000/user/userid
router.delete('/:userId', userDeleteById); //DELETE localhost:5000/user/userid
router.delete('/', userDeleteAll);
export default router;
