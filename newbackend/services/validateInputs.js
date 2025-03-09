export const validateInputData = (treesData, parksData, forestsData, airQualityData) => {
    if (!treesData && !parksData && !forestsData && !airQualityData) {
      throw new Error("At least one data set (trees, parks, forests, or air quality) must be provided.");
    }
  };  