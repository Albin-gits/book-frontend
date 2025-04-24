import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const images = [
    
    "/b6.jpg",
    "/b8.jpg",
    "/b7.jpg",
    "/b5.jpg",
    "/b9.jpg",
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2700,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: "0",
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          color: "rgb(250, 235, 215)",
          fontSize: "4rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Discover Your Next Favorite Book
      </div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
              }}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
