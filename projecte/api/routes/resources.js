import express from 'express';
import ResourceController from '../controllers/resourcesController.js';

const router = express.Router();
const resourceController = new ResourceController();

router.get('/', (req, res) => {
  resourceController.getAll(req, res);
});

router.get('/:id', (req, res) => {
  resourceController.getOne(req, res);
});

router.post('/', (req, res) => {
  resourceController.add(req, res);
});

router.put('/:id', (req, res) => {
  resourceController.update(req, res);
});

router.delete('/:id', (req, res) => {
  resourceController.delete(req, res);
});

export default router;