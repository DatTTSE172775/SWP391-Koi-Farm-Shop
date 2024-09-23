import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Blog from "./components/blog/Blog";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
