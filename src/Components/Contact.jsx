import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const res = await fetch("https://formspree.io/f/xzzrdrne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('❌ Error connecting to server.');
    }

    setLoading(false);
  };

  return (
    <div>
      <div style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif"
      }}>
        <h1 style={{ color: "rgb(129,77,8)" }}>Contact Us</h1>
        <p style={{ fontSize: "1.1rem" }}>
          We'd love to hear from you! Send us your feedback or questions.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem",marginLeft:"5px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "1rem"
            }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "1rem"
            }}
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              marginBottom: "1rem"
            }}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "1rem",
              backgroundColor:"rgb(129,77,8)",
              color: "white",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p style={{
            marginTop: "1rem",
            color: status.startsWith('✅') ? "green" : "red",
            fontWeight: "bold"
          }}>
            {status}
          </p>
        )}

        
      </div>
    </div>
  );
};

export default Contact;
