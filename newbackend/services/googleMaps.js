import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

export const geocodeLocation = async (location) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${googleMapsApiKey}`;

  console.log(`Geocoding location: ${location} using URL: ${url}`); // Log the URL used for geocoding

  try {
    const response = await axios.get(url);
    const locationData = response.data.results[0]?.geometry?.location;

    if (locationData) {
      console.log('Geocoded location:', locationData); // Log the geocoded location data
      return locationData;  // Returns latitude and longitude
    } else {
      console.error("Location not found");
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error("Error geocoding location:", error);
    throw error;
  }
};