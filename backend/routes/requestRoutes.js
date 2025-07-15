const express = require('express');
const router = express.Router();
const {
  createRequest,
  getHospitalRequests,
  getCenterRequests,
  updateRequestStatus
} = require('../controllers/requestController');

const protect = require('../middleware/authMiddleware');

// Protected routes
router.use(protect);

// Hospital creates a request
router.post('/', createRequest);

// Hospital views their requests
router.get('/hospital', getHospitalRequests);

// Center views incoming requests
router.get('/center', getCenterRequests);

// Center updates request status
router.put('/:id', updateRequestStatus);

module.exports = router;
