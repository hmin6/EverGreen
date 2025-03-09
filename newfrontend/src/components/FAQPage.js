import React from 'react';
import '../styles/PageContainer.css';

const FAQPage = () => {
  return (
    <div className="page-container">
      <h1 style={{ color: '#1B5E20' }}>Frequently Asked Questions</h1>
      <p>Below are some frequently asked questions about the app:</p>

      <h3 className='a'>
        What is the EverGreen map?
      </h3>
      <h6 className='b'>
        The EverGreen map is an online software that works by analyzing environmental 
        conditions across the world and grading the regions on a gradient map, using a 
        scale from 0 to 4, where 0 represents an “unsafe” area that is highly susceptible 
        to pollution and 4 represents a “safe” area whose environment is adequately healthy. 
      </h6>

      <h3 className='a'>
        How do I use the EverGreen map?
      </h3>
      <h6 className='b'>
        To use the EverGreen Map, the user must first enter the location of the region that they 
        wish to study. This can be as specific as a zip code or as general as the country in which 
        they live. After entering this information, the user is then prompted to enter four API keys, 
        corresponding to four different metrics—tree data, forests, and air quality data. After the 
        necessary data is entered, the user is then presented with a gradient map where darker areas 
        represent the healthiest areas and lighter areas represent the most vulnerable areas.
      </h6>

      <h3 className='a'>
        How was EverGreen developed?
      </h3>
      <h6 className='b'>
      EverGreen was developed as both a front-end and a back-end project. The front-end component 
      was largely developed through the use of HTML, CSS, and JavaScript, with support from frameworks, 
      such as Next.js and React.js. Meanwhile, the back-end component of this project was developed using 
      Node.js and Express.js, with support from the Google Maps API and the Open AI API.
      </h6>
      
      <h3 className='a'>
        Where can I find API keys for the four listed metrics?
      </h3>
      <h6 className='b'>
        Data for any of the four given metrics can be accessed through any 
        open-sourced website that provides free environmental data APIs, such 
        as the NYC Open Data API or the Envirofacts Data Service API.
      </h6>
      
      <h3 className='a'>
        Do I need to enter API keys for all four of the listed metrics?
      </h3>
      <h6 className='b'>
        No. As long as you provide a valid API key for at least one of the four 
        metrics, you will be able to see the EverGreen map. However, the more data 
        you provide, the more accurate the regional gradings you observe will be.
      </h6>

      <h3 className='a'>
        Can I enter API keys for other environmental data?
      </h3>
      <h6 className='b'>
        At the moment, the EverGreen Map only takes in API keys for the four listed 
        metrics: trees, parks, forests, and air quality. In the future, we plan to 
        support APIs from other environmental metrics, including water quality and 
        abundance of wildlife.
      </h6>

      <h3 className='a'>
        Can I save or store the results from my previous searches?
      </h3>
      <h6 className='b'>
        No. At the moment EverGreen does not provide support for saving the data from 
        user searches. However, we do have plans in the future to implement a more expansive 
        database that will allow users to save, store, and compare the data that they gather.
      </h6>
    </div>
  );
};

export default FAQPage;