const express = require('express');
const router = express.Router();
const {
  addOrgan,
  getOrgans,
  getMyOrgans,
  deleteOrgan,
} = require('../controllers/organController');

const protect = require('../middleware/authMiddleware');

// Public: Get all available organs (with optional filters)
router.get('/', getOrgans);

// Protected: Center-specific routes
router.use(protect);

// Center only: Add new organ
router.post('/add', addOrgan);

// Center only: View their own organs
router.get('/my', getMyOrgans);

// Center only: Delete organ
router.delete('/:id', deleteOrgan);

module.exports = router;
