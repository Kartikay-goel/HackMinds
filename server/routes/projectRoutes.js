const express = require('express');
const router = express.Router();
const { generateProject, getProjectsHistory, deleteProject } = require('../controllers/projectController');

router.post('/generate-project', generateProject);
router.get('/projects', getProjectsHistory);
router.delete('/projects/:id', deleteProject); // NEW DELETE ROUTE

module.exports = router;