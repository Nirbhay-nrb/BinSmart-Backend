const express = require('express');
const validateToken = require('../middleware/validate_token_handler');
const { getComplaints, createComplaint, getComplaintsByUser, getComplaint, deleteComplaint, updateComplaint } = require('../controllers/complaint_controller');

const router = express.Router();

router.use(validateToken);

router.route('').get(getComplaints).post(createComplaint);
router.route('/user/:id').get(getComplaintsByUser);
router.route('/:id').get(getComplaint).delete(deleteComplaint).post(updateComplaint);


module.exports = router;