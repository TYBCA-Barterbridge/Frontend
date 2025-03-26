import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Product from "./pages/ProductDetails/ProductDetails.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import { ROLES } from "./config/roles.jsx";
import ResetPass from "./pages/auth/ResetPass.jsx";
import Verification from "./pages/auth/Verification.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import ForgotPass from "./pages/auth/ForgotPass.jsx";
import Home from "./pages/Homee/Home.jsx";
import CustomerCare from "./pages/CustomerCare/CustomerCare.jsx";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails.jsx";
import Goods from "./pages/Goods/Goods.jsx";
import WorkShop from "./pages/WorkShop/WorkShop.jsx";
import Skills from "./pages/Skills/Skills.jsx";
import ChatLayout from "./pages/Chat/ChatLayout.jsx";
import ChatProfile from "./pages/Chat/Profile.jsx";
import UserProfileView from "./components/UserProfile/UserProfileView.jsx";
import AdminLayout from './components/AdminDashboard/AdminLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminUsers from './components/AdminDashboard/AdminUsers';
import AdminWorkshops from './components/AdminDashboard/AdminWorkshops';
import AdminTrades from './components/AdminDashboard/AdminTrades';
import OrderSummary from './components/OrderSummary/OrderSummary';
import UserMenus from './pages/UserDashboard/UserMenus';
import Profile from "./pages/UserDashboard/Profile.jsx";
import YourListings from "./pages/UserDashboard/YourListings/YourListings.jsx";
import OrderHistory from "./pages/UserDashboard/OrderHistory/OrderHistory.jsx";
import OrderHistoryDetails from "./pages/UserDashboard/OrderHistory/OrderHistoryDetails.jsx";
import Workshops from "./pages/UserDashboard/Workshops/Workshops.jsx";
import TradePage from "./pages/TradePage.jsx";

function App() {

  return (
    <Routes>
      {/* Admin Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="trades" element={<AdminTrades />} />
            <Route path="workshops" element={<AdminWorkshops />} />
          </Route>
        </Route>
      </Route>

      {/* User Routes */}
      <Route path="/" element={<Layout className="overflow-x-hidden" />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Verify" element={<Verification />} />
        <Route path="/Forgot" element={<ForgotPass />} />
        <Route path="/Reset" element={<ResetPass />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/WorkshopDetails" element={<WorkshopDetails />} />
        <Route path="/Goods" element={<Goods />} />
        <Route path="/WorkShop" element={<WorkShop />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/customercare" element={<CustomerCare />} />
        <Route path="/SignIn" element={<SignIn />} />

        {/* Protected User Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/Care" element={<CustomerCare />} />
            <Route path="/Trade" element={<TradePage />} />
            <Route path="/Chat" element={<ChatLayout />} />
            <Route path="/Chat/Profile" element={<ChatProfile />} />
            <Route path="/Users/:userId" element={<UserProfileView />} />
            <Route path="/dashboard" element={<UserMenus />} >
              <Route index element={<Profile />} />
              <Route path="YourListings" element={<YourListings />} />
              <Route path="Workshops" element={<Workshops />} />
              <Route path="OrderHistory" element={<OrderHistory />} />
              <Route path="OrderHistoryDetails" element={<OrderHistoryDetails />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
