const asyncHandler = require('express-async-handler');

// @desc    Test route
// @route   GET /test
const test = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Server running" });
});

module.exports = test;