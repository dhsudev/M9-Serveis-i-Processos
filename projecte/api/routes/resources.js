import express from 'express';
import { getResources, addResource } from '../controllers/resourcesController.js';

const router = express.Router();

router.get('/', getResources);   // GET /api/resources
router.post('/', addResource);   // POST /api/resources

export default router;
