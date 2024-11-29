import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import qrCodeImage from "./qrimage.jpeg"; // Import your QR image

function App() {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState(""); // User's UPI ID input
  const amountInputRef = useRef(null); // Reference for amount input to prevent scroll

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Ensure the value is within the allowed range (1 to 500000)
    if (value === "" || (value <= 500000 && value >= 1)) {
      setAmount(value);
    }
  };

  // Handle UPI ID change
  const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
  };

  // Prevent scroll from changing the amount value
  const preventScroll = (e) => {
    e.preventDefault();
  };

  // Set up event listener for disabling scroll on the amount input field
  useEffect(() => {
    const inputElement = amountInputRef.current;

    // Add event listener to prevent scroll
    if (inputElement) {
      inputElement.addEventListener("wheel", preventScroll);
    }

    // Clean up on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", preventScroll);
      }
    };
  }, []);

  // Handle payment redirection
  const handlePayment = () => {
    if (!upiId || !amount || amount <= 0) {
      alert("Please enter a valid UPI ID and amount.");
      return;
    }

    // Replace 'yourupi@bank' with your actual UPI ID if you want to pre-fill it
    const myUpiId = "jeevankumar06m@okicici"; // CHANGE this to your UPI ID
    const googlePayUrl = `intent://pay?pa=${myUpiId}&pn=Voluntree%20Donation&am=${amount}&cu=INR#Intent;package=com.google.android.apps.nbu.paisa.user;scheme=upi;end`;

    window.location.href = googlePayUrl;
  };

  return (
    <div className="App">
      <h1>Voluntree</h1>

      {/* QR Code Image */}
      <img src={qrCodeImage} alt="UPI QR Code" className="qr-code" />

      {/* UPI ID Input */}
      <input
        type="text"
        className="upi-id-input"
        placeholder="Enter your UPI ID"
        value={upiId}
        onChange={handleUpiIdChange}
      />

      {/* Amount Input */}
      <input
        ref={amountInputRef}
        type="number"
        className="amount-input"
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
        min="1"
        max="500000" // Maximum amount limit
      />

      {/* Pay Button */}
      <button className="payment-button" onClick={handlePayment}>
        Pay ₹{amount || "0"}
      </button>
    </div>
  );
}

export default App;
