const express = require('express');
const { getCommunities, getCommunity, createCommunity, deleteCommunity } = require('../controllers/community_controller');

const router = express.Router();

router.route('').get(getCommunities).post(createCommunity);
router.route('/:id').get(getCommunity).delete(deleteCommunity);

module.exports = router;