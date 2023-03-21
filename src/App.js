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

  const [data, setData] = useState({ 'characters': [], 'isData': false })
  const sharedDataState = { data, setData }

  return (
    <AppContext.Provider value={sharedDataState}>
      <BrowserRouter>
        <Container>
          <CarouselPage />
          <NavbarPage />
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
