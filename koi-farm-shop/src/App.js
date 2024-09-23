import React from "react";
import Navbar from "./components/Navbar"; // Đường dẫn đến file Navbar.js

function App() {
  return (
    <div className="App">
      {/* Hiển thị navbar */}
      <Navbar />

      {/* Nội dung chính của trang web */}
      <main>
        <h1>Welcome to Koi Farm Shop</h1>
        {/* Các thành phần khác trong trang */}
      </main>
    </div>
  );
}

export default App;
