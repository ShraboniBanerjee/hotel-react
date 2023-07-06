import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const PropertySlideShow = ({image_1, image_2, image_3, image_4}) => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src={image_1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Front View</h3>
          <p>One of the best hotel in town!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src={image_3}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Side View</h3>
          <p>One of the best hotel in town!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src={image_2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Side View</h3>
          <p>One of the best hotel in town!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default PropertySlideShow;