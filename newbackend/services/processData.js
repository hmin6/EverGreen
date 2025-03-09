import { geocodeLocation } from './googleMaps.js';
import { getHealthScore } from './chatgpt.js';

export const processLocationData = async (location, treesData, parksData, forestsData, airQualityData) => {
  try {
    // Step 1: Geocode the location
    const coordinates = await geocodeLocation(location);
    console.log("Coordinates: ", coordinates); // Log the geocoded coordinates

    // Step 2: Prepare environmental data for OpenAI API
    const environmentalData = {
      trees: treesData,
      parks: parksData,
      forests: forestsData,
      airQuality: airQualityData,
    };

    console.log('Prepared environmental data for OpenAI:', environmentalData); // Log the prepared data

    // Step 3: Get health score from OpenAI
    const healthScore = await getHealthScore(environmentalData);
    console.log("Health Score: ", healthScore); // Log the health score returned by OpenAI

    // Step 4: Process environmental data to generate heatmap points
    const heatmapData = processEnvironmentalDataForHeatmap(
      treesData, parksData, forestsData, airQualityData, coordinates, healthScore
    );
    console.log('Generated heatmap data:', heatmapData); // Log the generated heatmap data

    // Return the generated data and coordinates to frontend
    return { locationCoordinates: coordinates, healthScore, heatmapData };
  } catch (error) {
    console.error("Error processing location data:", error);
    throw error;
  }
};

// A helper function to process environmental data into points for heatmap layer
const processEnvironmentalDataForHeatmap = (treesData, parksData, forestsData, airQualityData, coordinates, healthScore) => {
  const heatmapPoints = [];

  // If there is sufficient data for each zone, generate heatmap points
  if (treesData && parksData && forestsData && airQualityData) {
    const point = {
      lat: coordinates.lat,
      lng: coordinates.lng,
      weight: healthScore,  // Weight the point based on health score
    };

    heatmapPoints.push(point);
  }

  return heatmapPoints;
};