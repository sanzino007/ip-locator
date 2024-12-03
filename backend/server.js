import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import path from 'path';

// Initialize the Express app
const app = express();
app.use(express.json());

// Correct path to the frontend folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Serve static files from 'frontend'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ipDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import the IP Location model
import IpLocation from './models/ipLocation.js';

// API endpoint to save IP location data
app.post('/save-ip-location', async (req, res) => {
    const { ip } = req.body;

    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const data = response.data;

        if (data.error) {
            return res.status(400).json({ error: 'Invalid IP address or data not available' });
        }

        const newIpLocation = new IpLocation({
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude,
        });

        await newIpLocation.save();
        res.status(200).json({ message: 'IP location data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving IP location data' });
    }
});

// Fallback route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Serve index.html
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
