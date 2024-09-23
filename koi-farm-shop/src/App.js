import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/productList" element={<ProductList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
