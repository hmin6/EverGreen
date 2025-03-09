import React from 'react';
import '../styles/MissionPage.css'; // Import the corresponding CSS file

const MissionPage = () => {
  return (
    <div className="mission-container">
      <h1>Our Mission</h1>
      <p>
        EverGreen is dedicated to helping users understand environmental risks in 
        different regions across the world by delivering up-to-date air quality data. 
        Our goal is to support environmental advocates and policymakers by highlighting 
        areas that are most affected by pollution, ultimately fostering a healthier and 
        more sustainable future.
      </p>
      <p>
        Our goal is to encourage environmental awareness and action by making 
        complex ecological data accessible and easy to interpret. In this regard,
        our goal is twofold: On one hand, we wish to provide policymakers with the 
        necessary resources to make informed decisions for the betterment of their 
        districts. On the other hand, we would like to mobilize our users by having 
        them be more conscious of environmental conditions in their communities.
      </p>
      <p> Join us in our journey towards a more sustainable world! 🌍</p>
    </div>
  );
};

export default MissionPage;