// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Function to generate random data in the range of 10 to 110
function generateRandomData() {
    const min = 0;
    const max = 150;
    
    return {
        networks: Math.floor(Math.random() * (max - min + 1)) + min,  // random value between 10 and 110
        jobs: Math.floor(Math.random() * (max - min + 1)) + min,
        messaging: Math.floor(Math.random() * (max - min + 1)) + min,
        notifications: Math.floor(Math.random() * (max - min + 1)) + min
    };
}


// API endpoint to return random data
app.get('/notifications', (req, res) => {
    const data = generateRandomData();
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/notifications`);
});
