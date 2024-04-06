import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import HomePage from "./pages/home/page";
import ShopPage from "./pages/shop/page";
import Header from "./components/header/Header";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
