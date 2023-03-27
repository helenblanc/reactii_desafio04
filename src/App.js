import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from 'react';
import Headers from './Components/Headers';
import Footer from './Components/Footer';
import Container from 'react-bootstrap/Container';
import AppContext from './app_context';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Views/Home';
import Favorite from './Views/Favorite';
import Character from './Views/Character';
import NoPage from './Views/NoPage';
import NavbarPage from './Components/NavbarPage';
import CarouselPage from './Components/CarouselPage';

function App() {
  // VARIABLE GLOBAL CARRITO
  const [cart, setCart] = useState({ 'pizzas': {}, 'totalPago': 0, })
  const sharedDataState = { cart, setCart }

  return (
    <AppContext.Provider value={sharedDataState}>
      <BrowserRouter>
        <Container>
          <NavbarPage />
          <CarouselPage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
