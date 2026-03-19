import express from 'express'
import { getStudentsA, getStudentsB, getStudentsC } from '../controllers/reportController.js';

const router = express.Router()

router.post('/getStudentsA', getStudentsA)
router.post('/getStudentsB', getStudentsB); 
router.post('/getStudentsC', getStudentsC);  
export default router