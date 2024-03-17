const asyncHandler = require('express-async-handler');

// @desc    Test route
// @route   GET /test
const test = asyncHandler(async (req, res) => {
    console.log("Server running");
    res.status(200).json({ message: "Server running" });
});

module.exports = test;