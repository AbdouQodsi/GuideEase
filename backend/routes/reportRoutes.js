const express = require('express');
const router = express.Router();
const { createReport, getPendingReports, getReportById, updateReportStatus } = require('../controllers/reportController');

router.post('/', createReport);
router.get('/pending', getPendingReports);
router.get('/:id', getReportById); 
router.put('/:id/status', updateReportStatus); 

module.exports = router;