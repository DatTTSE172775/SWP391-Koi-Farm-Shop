import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Blog from "./components/blog/Blog";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
