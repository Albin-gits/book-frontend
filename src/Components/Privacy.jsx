import React from 'react';

const Privacy = () => {
  return (
    <div>
      <div style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif"
      }}>
        <h1 style={{ color: "#2c3e50" }}>Privacy Policy</h1>
        
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          At <strong>BookReviewHub</strong>, your privacy is important to us. This policy outlines what personal information we collect and how we use it.
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
          Some of the links on our site are affiliate links (e.g., Amazon). This means we may earn a small commission at no extra cost to you if you make a purchase.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Data Protection</h3>
        <p style={{ lineHeight: "1.6" }}>
          We do not sell, trade, or share your personal data with third parties, except as required by law or as necessary to operate the website.
        </p>

        <h3 style={{ marginTop: "1.5rem" }}>Contact</h3>
        <p style={{ lineHeight: "1.6" }}>
          If you have questions about this policy, contact us at: <a href="mailto:your@email.com">your@email.com</a>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
