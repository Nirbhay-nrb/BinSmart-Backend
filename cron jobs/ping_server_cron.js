const cron = require('node-cron');
const axios = require('axios');

const runCronJob = () => {
    // cron job for pinging the server every 10 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        // Send a GET request to your test route
        const server_url = process.env.SERVER_URL;
        const response = await axios.get(`${server_url}/test`);
        const currentTime = new Date().toLocaleTimeString();
        console.log(`[${currentTime}] : ${JSON.stringify(response.data)}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
});
};

module.exports = runCronJob;