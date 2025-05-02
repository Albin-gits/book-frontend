import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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
    <div style={{ fontFamily: "Arial, sans-serif", color: "#2c3e50"}}>
      {/* Hero Slider */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
         
        }}
      >
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
            textAlign: "center",
            padding: "1rem",
            
          }}
        >
          Discover Your Next Favorite Book
        </div>
      </div>

      {/* About Section */}
      <div
        style={{
          
          padding: "3rem 1.5rem",
          paddingLeft: "2.5rem",
          backgroundColor: "lightgray",
          marginTop: "-0.3rem",
          borderRadius: "0.75rem",
          boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.05)",
         
        }}
      >
        <h1 style={{ color: "#2c3e50", textAlign: "center", fontSize: "2rem" }}>About</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", textAlign: "justify" }}>
          Welcome to <strong>BookLens</strong>, your ultimate destination for
          thoughtful and honest book reviews. Whether you're into heart-racing
          thrillers, heartwarming romances, or mind-bending sci-fi, we’ve got
          something for every reader.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", textAlign: "justify" }}>
          Our goal is to help readers discover great books and make informed
          reading choices. We feature user-submitted reviews, staff picks, and
          affiliate links to support our site.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "#7f8c8d",
            textAlign: "justify",
            marginBottom: "0",
          }}
        >
          Thanks for being part of our reading community!
        </p>
      </div>

      {/* Privacy Policy Section */}
      <div className="privacy-policy" style={{ padding: "3rem 1.5rem",
          paddingLeft: "2.5rem",
          backgroundColor: "lightgray",
          borderTop: "1px solid #e0e0e0",
          borderRadius: "0.75rem",
          boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.05)", }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center", fontSize: "2rem" }}>Privacy Policy</h1>
      

      <h2>1. Introduction</h2>
      <p>
        Welcome to <strong>Book Lens</strong>. We are committed to protecting your
        privacy and ensuring transparency about how we collect, use, and share your information when you visit our
        website https://bookslens.netlify.app/.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, etc. (only if provided voluntarily)</li>
        <li><strong>Non-Personal Information:</strong> Browser type, IP address, pages visited, etc.</li>
        <li><strong>Cookies and Tracking:</strong> Used to personalize content and ads.</li>
      </ul>

      <h2>3. Use of Google AdSense and Cookies</h2>
      <ul>
        <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
        <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
        <li>
          Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
        </li>
        <li>
          Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
        </li>
      </ul>

      <h2>4. How We Use Your Information</h2>
      <ul>
        <li>To operate and improve our website</li>
        <li>To serve relevant advertising</li>
        <li>To communicate with users</li>
        <li>To analyze user behavior and traffic</li>
      </ul>

      <h2>5. Sharing Your Information</h2>
      <p>
        We do <strong>not sell</strong> your personal information. We may share your data with:
        <ul>
          <li>Third-party service providers</li>
          <li>Legal authorities when required</li>
        </ul>
      </p>

      <h2>6. Your Rights and Choices</h2>
      <ul>
        <li>Opt out of personalized advertising</li>
        <li>Disable cookies through your browser</li>
        <li>Request data deletion (if applicable)</li>
      </ul>

      <h2>7. External Links</h2>
      <p>
        Our site may link to external websites. We are not responsible for their privacy practices.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy. Any changes will be posted here.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have questions, please contact us at:<br />
        📧 <Link to="/Contact">Contact</Link><br />
        📍 [Book Lens]
      </p>
    </div>


      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "1rem",
          marginTop: "2rem",
          fontSize: "1rem",
        }}
      >
        &copy; {new Date().getFullYear()} BookLens. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
