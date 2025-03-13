import { Routes, Route, useLocation } from "react-router-dom";
import Product from "./pages/ProductDetails/ProductDetails.jsx";
import Layout from "./components/Layout.jsx"
import RequireAuth from "./features/auth/RequireAuth.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import { ROLES } from "./config/roles.jsx";
import ResetPass from "./pages/auth/ResetPass.jsx"
import Verification from "./pages/auth/Verification.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import ForgotPass from "./pages/auth/ForgotPass.jsx";
import Home from "./pages/Homee/Home.jsx";
import CustomerCare from "./pages/CustomerCare/CustomerCare.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import YourListings from "./pages/YourListings/YourListings.jsx";
import UploadPage from "./pages/UploadPage/UploadPage.jsx";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails.jsx"


  function App() {
    return (
      <Routes>
        {/* Public Routes */}
         <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Verify" element={<Verification />} />
        <Route path="/Forgot" element={<ForgotPass />} />
        <Route path="/Reset" element={<ResetPass />} />
        <Route path="/Product" element={<Product />} />
  
        <Route path="/SignIn" element={<SignIn />}/>
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Care" element={<CustomerCare />} />
              <Route path="/YourListings" element={<YourListings />} />
              <Route path="/Upload" element={<UploadPage />} />
            </Route>
          </Route>
          </Route>
      </Routes>
    );
  }
export default App;


{/* Admin Protected Route
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="users" element={<User Management />} /> {/* Replace with your actual component
          </Route> */}


{/* Admin Protected Route
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="users" element={<User Management />} /> {/* Replace with your actual component
          </Route> */}
