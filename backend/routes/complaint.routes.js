const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/', authMiddleware, upload.single('proofFile'), complaintController.createComplaint);
router.get('/', authMiddleware, complaintController.getComplaints);
router.get('/:id', authMiddleware, complaintController.getComplaintById);
router.put('/:id/status', authMiddleware, complaintController.updateComplaintStatus);
router.put('/:id/details', authMiddleware, complaintController.updateComplaintDetails);
router.delete('/:id', authMiddleware, complaintController.deleteComplaint);

module.exports = router;
