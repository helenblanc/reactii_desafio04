import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const img1 = 'http://' + window.location.hostname + ':3000/api/pizza1.PNG';
  const img2 = 'http://' + window.location.hostname + ':3000/api/pizza2.PNG';
  const img3 = 'http://' + window.location.hostname + ':3000/api/pizza3.PNG';

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='mx-auto my-4' height={'100px'}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;