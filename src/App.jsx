import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.jsx";
import Home from "./pages/Homee/Home.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ForgotPass from "./pages/ForgotPass.jsx";
import CustomerCare from "./pages/CustomerCare/CustomerCare.jsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Verification from "./pages/Verification.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ChatIcon from "./components/ChatIcon/ChatIcon.jsx";
import YourListings from "./pages/YourListings/YourListings.jsx";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
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
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/YourListings" element={<YourListings />} />
        <Route path="/UploadPage" element={<UploadPage />} />
      </Routes>

      <ChatIcon />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
