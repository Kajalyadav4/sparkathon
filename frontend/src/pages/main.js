// src/pages/Main.js
import React from "react";
import "./main.css";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const products = [
    { id: 1, name: "Floral Sundress", price: "₹1129", emoji: "👗" },
    { id: 2, name: "Chunky White Sneakers", price: "₹5999", emoji: "👟" },
    { id: 3, name: "High-Waisted Jeans", price: "₹659", emoji: "👖" },
    { id: 4, name: "Cotton T-Shirt", price: "₹399", emoji: "👕" },
    { id: 5, name: "Silk Blouse", price: "₹399", emoji: "👚" },
    { id: 6, name: "Denim Jacket", price: "₹1999", emoji: "🧥" },
  ];

  // Placeholder click handler (to implement later)
const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <header>
        <nav className="container">
          <a href="#" className="logo">
            NeoCart
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to NeoCart</h1>
            <p>New-Era Shopping experience with Voice, Vision & AI</p>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover our carefully curated collection of fashion essentials
            </p>
          </div>

          <div className="product-grid">
            {products.map(({ id, name, price, emoji }) => (
              <div
                key={id}
                className="product-card"
                onClick={() => handleClick(id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') handleClick(id); }}
              >
                <div className="product-image">{emoji}</div>
                <div className="product-info">
                  <h3 className="product-name">{name}</h3>
                  <p className="product-price">{price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Shop</h3>
              <ul>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Accessories</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 NeoCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
