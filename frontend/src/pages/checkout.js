

import React, { useEffect, useRef, useState } from "react";
import "./checkout.css";

function Checkout() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentStep, setCurrentStep] = useState("idle");
  const [showReview, setShowReview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const recognitionRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.8;
    synth.speak(utter);
  };

  const handleCommand = (command) => {
    setShowProgress(true);
    setTimeout(() => {
      if (currentStep === "idle") {
        if (command.includes("checkout") || command.includes("place") || command.includes("order")) {
          setCurrentStep("review");
          setShowReview(true);
          speak("Your order total is ₹4,247.76. Say confirm to place your order.");
        } else {
          setErrorMsg("Say 'checkout my cart' or 'place my order' to begin");
          setShowError(true);
        }
      } else if (currentStep === "review") {
        if (command.includes("confirm")) {
          setCurrentStep("confirmed");
          setShowReview(false);
          setShowConfirm(true);
          speak("Order confirmed! Your items will arrive on Tuesday.");
          sendToBackend("confirm");
        } else if (command.includes("cancel")) {
          setCurrentStep("idle");
          setShowReview(false);
          setTranscript("");
        } else {
          setErrorMsg("Say 'confirm' to place order or 'cancel' to go back");
          setShowError(true);
        }
      }
      setShowProgress(false);
    }, 1500);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setShowError(false);
      setTranscript("");
      console.log("🎤 Starting recognition...");
      recognitionRef.current.start();
    }
  };
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported on this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
  console.log("🟢 Speech recognition started");
  setIsListening(true);
};

recognition.onend = () => {
  console.log("🔴 Speech recognition ended");
  setIsListening(false);
};

recognition.onerror = (event) => {
  console.error("❌ Speech recognition error:", event.error);
  setErrorMsg("Speech recognition error. Try again.");
  setShowError(true);
  setIsListening(false);
};


    recognition.onresult = (event) => {
      console.log("🎧 Got voice input", event);

      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);

      if (event.results[event.results.length - 1].isFinal) {
        handleCommand(finalTranscript.toLowerCase().trim());
      }
    };

    recognitionRef.current = recognition;
  }, [currentStep]);

const sendToBackend = async (command) => {
  try {
    const response = await fetch('/process_checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });

    const result = await response.json();
    console.log("Backend response:", result);
  } catch (error) {
    console.error("Error connecting to backend:", error);
  }
};


  return (
    <div className="container">
      <div className="header">
        <h1>
          <i className="fas fa-microphone"></i> VoiceKey
        </h1>
        <p>Voice-Powered Checkout Experience</p>
      </div>

      <div className="main-content">
        {/* Cart Section */}
        <div className="cart-section">
  <h2>
    <i className="fas fa-shopping-cart"></i> Your Cart
  </h2>

  <div className="cart-item">
    <div className="item-info">
      <div className="item-name">Basic White T-Shirt</div>
      <div className="item-details">Cotton, Unisex, Size M</div>
    </div>
    <div className="item-price">₹499.00</div>
  </div>

  <div className="cart-item">
    <div className="item-info">
      <div className="item-name">White Sneakers</div>
      <div className="item-details">Chunky sole, Size 6</div>
    </div>
    <div className="item-price">₹1,799.00</div>
  </div>

  <div className="cart-item">
    <div className="item-info">
      <div className="item-name">High-Waisted Blue Jeans</div>
      <div className="item-details">Slim Fit, Size 28</div>
    </div>
    <div className="item-price">₹1,599.00</div>
  </div>

  <div className="cart-total">
    <div>Subtotal: ₹3,897.00</div>
    <div>Tax: ₹350.76</div>
    <div className="total-amount">Total: ₹4,247.76</div>
  </div>
</div>

        {/* Voice Section */}
        <div className="voice-section">
          <h2>
            <i className="fas fa-microphone-alt"></i> Voice Checkout
          </h2>

          <button
            className={`mic-button ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
          >
            <i className="fas fa-microphone"></i>
          </button>

          <div
            className={`voice-status ${isListening ? "active" : ""}`}
          >
            {isListening ? "Listening..." : "Click microphone to start voice checkout"}
          </div>

          <div className="transcription">
            {transcript || "Your voice input will appear here..."}
          </div>

          {showProgress && (
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          )}

          {showReview && (
            <div className="order-review">
              <h3>Order Review</h3>
              <p>
                Please say <strong>"confirm"</strong> to place your order,
                or <strong>"cancel"</strong> to go back.
              </p>
            </div>
          )}

          {showConfirm && (
            <div className="confirmation-message">
              <h3>
                <i className="fas fa-check-circle"></i> Order Confirmed!
              </h3>
              <p>Your order has been placed successfully. ETA: Tuesday.</p>
            </div>
          )}

          {showError && (
            <div className="error-message">
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Error
              </h3>
              <p>{errorMsg}</p>
            </div>
          )}
        </div>
      </div>

      {/* Voice Command Instructions */}
      <div className="instructions">
        <h3>
          <i className="fas fa-info-circle"></i> Voice Commands
        </h3>
        <ul>
          <li>
            Say <strong>"checkout my cart"</strong> or{" "}
            <strong>"place my order"</strong> to begin
          </li>
          <li>
            Say <strong>"confirm"</strong> to finalize your order
          </li>
          <li>
            Say <strong>"cancel"</strong> to go back
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Checkout;
