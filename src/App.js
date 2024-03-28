import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ShoppingCart from "./components/ShoppingCart";
import Home from "./components/Home";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/shop" element={<ShoppingCart />} />
        <Route path="/shop/:promo" element={<ShoppingCart />} />
        <Route path="/details/:item" element={<Details />} />
        <Route path="/*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
