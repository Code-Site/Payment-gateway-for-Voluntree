import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import logo from "./qrimage.jpeg"; // Import your image file (update the path accordingly)


function VoluntreeDonation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Replace with your actual Google Form action URL
    const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd7NmWSjYOkzLWmVgAIrj99xLSLbzkmsFvjo-AsPll5C44H-Q/formResponse";

    // Form entry IDs from the Google Form's input fields
    const formData = new URLSearchParams();
    formData.append("entry.1483531175", email);  // Replace with your form field ID for email
    formData.append("entry.328333951", name);   // Replace with your form field ID for name
    formData.append("entry.1840347458", upiId);   // Replace with your form field ID for UPI ID
    formData.append("entry.1007542278", amount);  // Replace with your form field ID for amount

    try {
      const response = await fetch(formUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        // Open a new tab with the thank you page
        window.open('/thank-you', '_blank');
      } else {
        alert("There was a problem submitting your response.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FF7F50", // Coral background
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Title should be above the image */}
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>VOLUNTREE</h1>

      {/* Image with hover effect class */}
      <img
        src={logo}
        alt="Voluntree Logo" // Add an alt description for accessibility
        className="donation-image" // Apply the CSS class
        style={{
          width: "150px", // Adjust size as needed
          height: "auto", // Maintain aspect ratio
          borderRadius: "15px", // Rounded edges
          marginBottom: "20px", // Space between the image and the form
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 0 15px rgba(255, 99, 71, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
        }}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
<input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && !value.startsWith("-"))) {
      setAmount(value);
    }
  }}
  onWheel={(e) => e.target.blur()} // Prevent scrolling in the input
/>
        <button type="submit">
          Submit Payment Details
        </button>
      </form>
    </div>
  );
}

export default VoluntreeDonation;
