import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const images = [
    "homepages.png",
    "/b8.jpg",
    "/b6.jpg",
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
    <div style={{ fontFamily: "Arial, sans-serif", color: "#2c3e50" }}>
      {/* Hero Slider */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "antiquewhite",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            zIndex: 2,
            textAlign: "center"
          }}
        >
          Discover Your Next Favorite Book
        </div>
      </div>

      {/* About Section */}
      <div style={{
        maxWidth: "100%",
        margin: "auto",
        padding: "3rem 1.5rem",
        paddingLeft:"40px",
        backgroundColor: "lightgray",
        marginTop: "-5px",
         borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ color: "#2c3e50", textAlign: "center" }}>About</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", textAlign: "justify" }}>
          Welcome to <strong>BookLens</strong>, your ultimate destination for thoughtful and honest book reviews. Whether you're into heart-racing thrillers, heartwarming romances, or mind-bending sci-fi, we’ve got something for every reader.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", textAlign: "justify" }}>
          Our goal is to help readers discover great books and make informed reading choices. We feature user-submitted reviews, staff picks, and affiliate links to support our site.
        </p>
        <p style={{ fontSize: "1rem", color: "#7f8c8d", textAlign: "justify" }}>
          Thanks for being part of our reading community!
        </p>
      </div>

      {/* Privacy Policy Section */}
      <div style={{
        maxWidth: "100%",
        margin: "auto",
        padding: "3rem 1.5rem",
        paddingLeft:"40px",
        backgroundColor:"lightgray",
        borderTop: "1px solid #e0e0e0",
        borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ color: "#2c3e50", textAlign: "center" }}>Privacy Policy</h1>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          At <strong>BookLens</strong>, your privacy is important to us. This policy outlines what personal information we collect and how we use it.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Information We Collect</h3>
        <p style={{ lineHeight: "1.6" }}>
          We may collect your name, email address, and any information you submit through forms on our site (like reviews or messages).
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Cookies and Tracking</h3>
        <p style={{ lineHeight: "1.6" }}>
          We use cookies and third-party tools like Google Analytics to improve your experience and understand how visitors interact with our site.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Affiliate Disclosure</h3>
        <p style={{ lineHeight: "1.6" }}>
          Some of the links on our site are affiliate links or images(e.g., Amazon,Google AdSense). This means we may earn a small commission at no extra cost to you if you make a purchase or click.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Data Protection</h3>
        <p style={{ lineHeight: "1.6" }}>
          We do not sell, trade, or share your personal data with third parties, except as required by law or as necessary to operate the website.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Contact</h3>
        <p style={{ lineHeight: "1.6" }}>
          If you have questions about this policy, contact us at:{" "}
          <a href="/Contact">contact  </a>
        </p>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "1rem",
        marginTop: "2rem"
      }}>
        &copy; {new Date().getFullYear()} BookLens. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
