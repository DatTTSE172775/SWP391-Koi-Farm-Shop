import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>{/* <Route path="/home" element={<Home />} /> */}</Routes>
      <Footer />
    </Router>
  );
}

export default App;
