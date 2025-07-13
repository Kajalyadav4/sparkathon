import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Checkout from "./pages/checkout";
import ProductDetail from './pages/product';  
//import VirtualTryOn from './pages/virtualtryon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/virtualtryon" element={<VirtualTryOn />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
