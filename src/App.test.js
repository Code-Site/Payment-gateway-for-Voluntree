import React, { useState } from "react";
import "./VoluntreeDonation.css"; // Import the CSS file

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
        alert("Thank you for your donation!");
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
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>VOLUNTREE</h1>
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
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">
          Submit Payment Details
        </button>
      </form>
    </div>
  );
}

export default VoluntreeDonation;
