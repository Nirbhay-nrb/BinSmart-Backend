// Importing necessary packages
const express = require('express');
const connectDb = require('./config/dbConnection');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Connect to the database
connectDb();

// Set up express app
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'http://localhost:5000',
        credentials: true
    }
));

// Importing routes
const testRoute = require('./routes/test_route');
const authRoute = require('./routes/auth_route');
const communityRoute = require('./routes/community_route');
const complaintRoute = require('./routes/complaint_route');
const dustbinRoute = require('./routes/dustbin_route');

// Using routes
app.use('/test', testRoute);
app.use('/auth', authRoute);
app.use('/community', communityRoute);
app.use('/complaint', complaintRoute);
app.use('/dustbin', dustbinRoute);

// Start server
app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
});