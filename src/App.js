import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import Container from 'react-bootstrap/Container';
import AppContext from './app_context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Views/Home';
import NoPage from './Views/NoPage';
import NavbarPage from './Components/NavbarPage';
import CarouselPage from './Components/CarouselPage';
import Cart from './Views/Cart';

function App() {
  // VARIABLE GLOBAL CARRITO
  const [cart, setCart] = useState({ 'pizzas': [], 'quantity': 0, 'pay': 0 })
  const sharedCartState = { cart, setCart }

  return (
    <AppContext.Provider value={sharedCartState}>
      <BrowserRouter>
        <Container>
          <NavbarPage />
          <CarouselPage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
