import express from 'express';
const router=express.Router();
import {test} from '../conrollers/user.js';
router.get('/test',test);
export default router;