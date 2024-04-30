import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Products from "./pages/Products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Navigate to='/login' />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products/:categoryId" element={<Products/>} />
        <Route path="login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
