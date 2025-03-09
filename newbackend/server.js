import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';  // Import axios for making HTTP requests
import { processLocationData } from './services/processData.js';
import { validateInputData } from './services/validateInputs.js';

dotenv.config();  // Load .env variables

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors()); 

app.use(bodyParser.json());  // Middleware to parse JSON bodies

// ✅ New endpoint to handle geocoding
app.get('/api/geocode', async (req, res) => {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: 'Location is required' });

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    res.status(500).json({ error: 'Failed to fetch geocode data' });
  }
});

app.post('/api/process', async (req, res) => {
  const { location, treesData, parksData, forestsData, airQualityData } = req.body;

  console.log("Received data:", req.body); // Log incoming request body

  try {
    // Validate input data
    validateInputData(treesData, parksData, forestsData, airQualityData);

    // Process the data (geocode the location and calculate the health score)
    const { locationCoordinates, healthScore, heatmapData } = await processLocationData(location, treesData, parksData, forestsData, airQualityData);

    // Log the final data to be sent to the frontend
    console.log("Sending data to frontend:", { locationCoordinates, healthScore, heatmapData });

    // Send the processed data (heatmap data, coordinates, and health score) to the frontend
    res.json({ locationCoordinates, healthScore, heatmapData });
  } catch (error) {
    console.error("Error in /api/process:", error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});