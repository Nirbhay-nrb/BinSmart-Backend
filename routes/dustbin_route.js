const express = require('express');
const { getAllDustbins, createDustbin, getDustbin, deleteDustbin, updateDustbin, getDustbinsByCommunity, getDustbinsForCleaner, assignDustbin, unassignDustbin } = require('../controllers/dustbin_controller');
const validateToken = require('../middleware/validate_token_handler');

const router = express.Router();

router.use(validateToken);

router.route('').get(getAllDustbins).post(createDustbin);
router.route('/:id').get(getDustbin).delete(deleteDustbin).post(updateDustbin);
router.route('/community/:id').get(getDustbinsByCommunity);
router.route('/cleaner/:id').get(getDustbinsForCleaner);
router.route('/assign/:id').post(assignDustbin);
router.route('/unassign/:id').post(unassignDustbin);

module.exports = router;