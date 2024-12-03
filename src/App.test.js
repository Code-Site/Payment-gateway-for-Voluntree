import React, { useState } from "react";
import QRCode from "qrcode.react";

const App = () => {
  const [upiId, setUpiId] = useState("");
  const [showQr, setShowQr] = useState(false);

  const generateUpiUrl = (upiId) => {
    return `upi://pay?pa=${upiId}&pn=Payee Name`; // Replace 'Payee Name' with the actual payee name if needed
  };

  const handleGenerateQr = () => {
    if (upiId) setShowQr(true);
    else alert("Please enter a valid UPI ID.");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>UPI QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter your UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <br />
      <button
        onClick={handleGenerateQr}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate QR Code
      </button>
      <div style={{ marginTop: "30px" }}>
        {showQr && (
          <>
            <QRCode value={generateUpiUrl(upiId)} size={200} />
            <p>Scan to Pay</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
