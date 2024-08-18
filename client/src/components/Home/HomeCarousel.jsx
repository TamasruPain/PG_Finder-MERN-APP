import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axios from 'axios';

const contentStyle = {
  height: '500px',
  width: 'auto',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'right',
  overflow: 'hidden',
};

const HomeCarousel = () => {
  const [propertyImages, setPropertyImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(result => {
        const images = result.data.slice(0, 4).map(property => property.propImage); // Limit to first 4 images
        setPropertyImages(images);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='p-4' align='center'>
      <Carousel autoplay>
        {
          propertyImages.map((image, index) => (
            <div key={index}>
              <div className="card text-bg-dark" style={contentStyle}>
                <img src={image} className="card-img" alt="..." style={{ height: '500px', width: 'auto' }} />
                <div className="card-img-overlay p-5" align='center'>
                  <h1 className='p-4 mx-5'>Welcome to the PG Finder</h1>
                  <p>Let's find a PG as per your need!</p>
                </div>
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default HomeCarousel;
