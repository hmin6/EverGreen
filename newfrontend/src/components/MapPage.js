/* global google */
import '../styles/PageContainer.css';
import './MapPage.css';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { HeatmapLayer } from '@react-google-maps/api';

const MapPage = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [dataApiKey, setDataApiKey] = useState({
    trees: '',
    parks: '',
    forests: '',
    airQuality: '',
  });
  const [dataError, setDataError] = useState('');
  const [heatmapData, setHeatmapData] = useState([]);

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Handle location submission
  const handleSubmit = async () => {
    if (!location) return;

    try {
      console.log(`Fetching coordinates for: ${location}`);
      const response = await fetch(
        `https://evergreen-be.vercel.app/api/geocode?location=${encodeURIComponent(location)}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Geocode API Response:', data);

        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
          setError(null);
          setDataError('');
        } else {
          setError('Could not find the location. Please try again.');
        }
      } else {
        setError('Failed to fetch data from the backend.');
      }
    } catch (err) {
      setError('An error occurred while fetching the location.');
    }
  };

  const handleDataApiChange = (e, type) => {
    setDataApiKey({
      ...dataApiKey,
      [type]: e.target.value,
    });
  };

  const handleDataSubmit = () => {
    const { trees, parks, forests, airQuality } = dataApiKey;
    if (!trees && !parks && !forests && !airQuality) {
      setDataError('You must provide at least one data API key.');
    } else {
      setDataError('');
      fetchData(trees, parks, forests, airQuality);
    }
  };

  // Fetch environmental data
  const fetchData = async (trees, parks, forests, airQuality) => {
    try {
      console.log('Fetching data for:', { trees, parks, forests, airQuality });

      const treeData = trees ? await fetch(trees).then((res) => res.json()) : [];
      const parkData = parks ? await fetch(parks).then((res) => res.json()) : [];
      const forestData = forests ? await fetch(forests).then((res) => res.json()) : [];
      const airQualityData = airQuality ? await fetch(airQuality).then((res) => res.json()) : [];

      console.log('Processed Data for Heatmap:', treeData, parkData, forestData, airQualityData);

      const processedData = processData(treeData, parkData, forestData, airQualityData);
      setHeatmapData(processedData);
    } catch (err) {
      console.error('Error fetching data from APIs:', err);
    }
  };

  const processData = (treeData, parkData, forestData, airQualityData) => {
    const points = [];

    const addPoints = (data) => {
      data.forEach((item) => {
        if (item.latitude && item.longitude) {
          points.push({
            location: new google.maps.LatLng(item.latitude, item.longitude),
            weight: item.score || 1,
          });
        }
      });
    };

    addPoints(treeData);
    addPoints(parkData);
    addPoints(forestData);
    addPoints(airQualityData);

    return points;
  };

  useEffect(() => {
    if (coordinates) {
      window.scrollTo(0, 0);
    }
  }, [coordinates]);

  return (
    <div>
      <h1>The EverGreen Map</h1>

      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location (ex: New York)" />
      <button onClick={handleSubmit}>Submit Location</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {coordinates && (
        <div>
          <h2>Enter Data APIs</h2>
          <input type="text" placeholder="Tree API Key" value={dataApiKey.trees} onChange={(e) => handleDataApiChange(e, 'trees')} />
          <input type="text" placeholder="Park API Key" value={dataApiKey.parks} onChange={(e) => handleDataApiChange(e, 'parks')} />
          <input type="text" placeholder="Forest API Key" value={dataApiKey.forests} onChange={(e) => handleDataApiChange(e, 'forests')} />
          <input type="text" placeholder="Air Quality API Key" value={dataApiKey.airQuality} onChange={(e) => handleDataApiChange(e, 'airQuality')} />
          <button onClick={handleDataSubmit}>Submit Data APIs</button>
          {dataError && <p style={{ color: 'red' }}>{dataError}</p>}
        </div>
      )}

      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['visualization']}>
        <div>
          {coordinates ? (
            <GoogleMap mapContainerStyle={{ height: '500px', width: '100%' }} zoom={12} center={coordinates}>
              <Marker position={coordinates} />
              {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} options={{ radius: 20, opacity: 0.6 }} />}
            </GoogleMap>
          ) : (
            <p>Please enter a location to view the map.</p>
          )}
        </div>
      </LoadScript>
    </div>
  );
};

export default MapPage;
