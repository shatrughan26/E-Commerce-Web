import Navbar from "./component/navbar"
import { Routes,Route,Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import Cart from "./Routes/Cart";
import Products from "./Routes/Products";
import Login from "./Routes/Login";
import Footer from "./component/Footer"
import AdminLogin from "./Routes/AdminLogin";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoginModal from "./component/LoginModel";
import ForgotPasswordModal from "./component/ForgotPasswordModel";
import AdminDashboard from "./Routes/AdminDashboard";
import UserOrderPlace from "./component/UserOrderPlace"
import SearchResults from "./Routes/SearchResult";
import MyProfile from "./component/UserProfileDashboard/MyProfile";
import Myaddress from "./component/UserProfileDashboard/Myaddress";
import Myoffers from "./component/UserProfileDashboard/Myoffers";
import Myorders from "./component/UserProfileDashboard/Myorders";
import Wishlist from "./component/UserProfileDashboard/Wishlist";
import UserDashboard from "./component/UserDashboard";



function App() {
  const userRole = localStorage.getItem("userRole") || "guest";

    return(
      <div className="app-wrapper relative overflow-x-hidden">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminorderstatus" element={<UserOrderPlace />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/userdashboard" element={<UserDashboard/>}/>
          <Route path="/profile" element={<MyProfile/>}/>
          <Route path="/orders" element={<Myorders/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/offers" element={<Myoffers/>}/>
          <Route path="/address" element={<Myaddress/>}/>
          
          <Route
            path="/admin"
            element={
              userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/admin-login" />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
      <LoginModal />
      <ForgotPasswordModal />
    </div>
  );
}

export default App;