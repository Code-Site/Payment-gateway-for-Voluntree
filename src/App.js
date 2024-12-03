import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Named import
import "./App.css"; // Import the CSS file

const App = () => {
  const [upiId, setUpiId] = useState("");
  const [showQr, setShowQr] = useState(false);

  const generateUpiUrl = (upiId) => {
    return `upi://pay?pa=${upiId}&pn=Payee Name`; // Replace 'Payee Name' with the actual payee name if needed
  };

  const handleGenerateQr = () => {
    if (upiId) {
      setShowQr(true);  // Show the QR code when the button is pressed
    } else {
      alert("Please enter a valid UPI ID.");
    }
  };

  return (
    <div className="donation-container">
      <h1>UPI QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />
      <button onClick={handleGenerateQr}>SUBMIT UPI ID</button>
      {showQr && (
        <div style={{ marginTop: "30px" }}>
          <QRCodeCanvas value={generateUpiUrl(upiId)} size={200} />
          <p>Scan to Pay</p>
        </div>
      )}
    </div>
  );
};

export default App;
