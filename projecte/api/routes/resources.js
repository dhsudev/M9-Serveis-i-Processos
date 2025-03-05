import express from 'express';
import {getResources, addResource, getResourceById, updateResource, deleteResource} from '../controllers/resourcesController.js';

const router = express.Router();

router.get('/:id?', (req, res) => req.params.id ? getResourceById(req, res) : getResources(req, res));
router.post('/', addResource);  
router.put('/:id?', updateResource); 
router.delete('/:id?', deleteResource);
export default router;
