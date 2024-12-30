import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPass from "./pages/ForgotPass.jsx";
import CustomerCare from "./pages/CustomerCare.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Verification from "./pages/Verification.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/CustomerCare" element={<CustomerCare />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/ProductDetails" element={<ProductDetails/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
