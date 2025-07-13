import React, { useState } from "react";
import "./product.css"; // move your long CSS there
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const [voiceActive, setVoiceActive] = useState(false);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      text: "Welcome to your personal styling session! I've analyzed current fashion trends and your style preferences.",
      sender: "assistant",
    },
    {
      text: "I need an elegant dress for a summer wedding",
      sender: "user",
    },
    {
      text: "Perfect! This floral dress is trending. Would you like a virtual try-on or see other colors?",
      sender: "assistant",
    },
  ]);

  const [selectedSize, setSelectedSize] = useState("M");
  const [viewMode, setViewMode] = useState("3d");
  const [cartCount, setCartCount] = useState(1);
  const [cartTotal, setCartTotal] = useState(89);

  const product = {
    title: "Elegant Floral Midi Dress",
    price: 89,
    original: 129,
    emoji: "👗",
  };

  const recommendations = [
    {
      key: "shoes",
      title: "Block Heel Sandals",
      price: 65,
      reason: "Perfect match for midi dresses",
      icon: "👠",
    },
    {
      key: "clutch",
      title: "Beaded Evening Clutch",
      price: 39,
      reason: "Complements floral patterns beautifully",
      icon: "👜",
    },
  ];

  const addMessage = (text, sender) =>
    setMessages((prev) => [...prev, { text, sender }]);

  const toggleVoice = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setTimeout(() => {
        addMessage("Show me this in a different color", "user");
        setTimeout(() => {
          addMessage(
            "Great! This also comes in sage green and dusty rose. Want to try virtual fitting?",
            "assistant"
          );
        }, 1500);
      }, 1500);
    }
  };

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === "virtual") {
      addMessage(
        `Virtual try-on activated! Size ${selectedSize} fits perfectly.`,
        "assistant"
      );
    } else if (mode === "styling") {
      addMessage(
        "Styling tip: Pair with nude heels and delicate jewelry.",
        "assistant"
      );
    }
  };

  const handleRecommendationClick = (item) => {
    addMessage(
      `Switching to ${item.title}. It pairs beautifully with your dress.`,
      "assistant"
    );
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    setCartTotal(cartTotal + product.price);
    addMessage("✓ Added to cart!", "assistant");
  };

  return (
    <div className="product-page">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-icon">{product.emoji}</div>
            VoiceCommerce Pro
          </div>
          <div className="header-info">
            <div className="user-context">
              <div className="status-indicator"></div>
              Fashion Enthusiast | Premium Member
            </div>
            <div className="user-context">✨ Style Analytics: Active</div>
          </div>
        </div>
      </header>

      <main className="container main-layout">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">AI Style Assistant</div>
            <div className="sidebar-subtitle">
              Voice-activated fashion discovery
            </div>
          </div>
          <div className="voice-interface">
            <div
              className={`voice-status ${voiceActive ? "listening" : ""}`}
              id="voiceStatus"
            >
              {voiceActive ? "🔴" : "🎤"}
            </div>
            <div className="conversation-panel">
              {messages.map((m, idx) => (
                <div key={idx} className={`message ${m.sender}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="voice-controls">
              <button className="btn btn-primary" onClick={toggleVoice}>
                🎤 {voiceActive ? "Listening..." : "Start Voice"}
              </button>
              <button className="btn btn-secondary">👗 Virtual Try-On</button>
            </div>
          </div>
        </aside>

        {/* Center Workspace */}
        <section className="product-workspace">
          <div className="product-header">
            <h2 className="product-title">{product.title}</h2>
            <p className="product-category">
              Summer Collection • Wedding Guest Attire
            </p>
          </div>
          <div className="product-viewer">
            <div
              className={`product-model ${
                viewMode === "3d" ? "rotating" : ""
              }`}
            >
              {product.emoji}
            </div>
            <div className="viewer-controls">
              {["3d", "virtual", "360", "styling"].map((mode) => (
                <button
                  key={mode}
                  className={`viewer-btn ${viewMode === mode ? "active" : ""}`}
                  onClick={() => handleViewModeChange(mode)}
                >
                  {mode === "3d"
                    ? "3D Model"
                    : mode === "virtual"
                    ? "Virtual Try-On"
                    : mode === "360"
                    ? "360° View"
                    : "Styling Tips"}
                </button>
              ))}
            </div>
          </div>
          <div className="product-details">
            <div className="size-selector">
              <div className="size-label">Select Size</div>
              <div className="size-options">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <div
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="pricing-section">
              <div className="price-display">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${product.original}</span>
                <span className="discount-badge">30% OFF</span>
              </div>
              <div className="pricing-info">
                <div className="pricing-context">
                  Summer sale + member discount applied
                </div>
                <div className="confidence-score">✓ Best price guaranteed</div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-secondary btn-large">
                ♡ Save for Later
              </button>
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="recommendations-panel">
          <div className="recommendations-header">
            <div className="recommendations-title">Style Recommendations</div>
            <div className="recommendations-subtitle">
              Curated for your taste
            </div>
          </div>
          {recommendations.map((item, idx) => (
            <div
              className="recommendation-item"
              key={idx}
              onClick={() => handleRecommendationClick(item)}
            >
              <div className="rec-header">
                <div className="rec-title">{item.title}</div>
                <div className="rec-price">${item.price}</div>
              </div>
              <div className="rec-reason">{item.reason}</div>
              <div className="rec-score">
                {item.icon} 98% match
              </div>
            </div>
          ))}
        </aside>
      </main>

      {/* Floating Cart */}
      <div className="cart-summary">
        <div className="cart-header">
          <div className="cart-title">Shopping Cart</div>
          <div className="cart-count">{cartCount}</div>
        </div>
        <div className="cart-total">${cartTotal}.00</div>
        <div className="cart-actions">
          <button className="btn btn-secondary">Review</button>
          <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
  Checkout
</button>

        </div>
      </div>
    </div>
  );
}
