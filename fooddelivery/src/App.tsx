import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css"
import Corporate from "./Pages/corporate";
import Search from "./Pages/search";
import Offer from "./Pages/offer";
import Help from "./Pages/help";
import SignIn from "./Pages/signIn";
import Navbar from "./Components/navbar";
import Cart from "./Pages/cart";


function App() {
  return (
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/corporate" element={<Corporate />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/offers" element={<Offer />}/>
          <Route path="/help" element={<Help />}/>
          <Route path="/signIn" element={<SignIn />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
