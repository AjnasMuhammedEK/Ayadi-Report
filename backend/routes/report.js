import express from 'express'
import { getStudentsA, getStudentsB, getStudentsC } from '../controllers/reportController.js';
import checkApiKey from '../middleware/apiKey_middle.js';
const router = express.Router()

router.post('/getStudentsA',checkApiKey, getStudentsA)
router.post('/getStudentsB',checkApiKey, getStudentsB); 
router.post('/getStudentsC',checkApiKey, getStudentsC);  
export default router