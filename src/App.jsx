import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Pages/Shared/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home/Home";
import NotFound from "./Components/Pages/Shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import Login from "./Components/Pages/Login/Login/Login";
import SignUp from "./Components/Pages/Login/SignUp/SignUp";
import ResetPassword from "./Components/Pages/Login/ResetPassword";
import Team from "./Components/Pages/Team/Team";
import Dashboard from "./Components/Pages/Dashboard/Dashboard/Dashboard";
import WelcomeDashboard from "./Components/Pages/Dashboard/WelcomeDashboard/WelcomeDashboard";
import RequireAuth from "./Components/Pages/Login/RequireAuth/RequireAuth";
import MyProfile from "./Components/Pages/Dashboard/MyProfile/MyProfile";
import { Toaster } from "react-hot-toast";
import ScrollButton from "./Components/Pages/Shared/ScrollButton/ScrollButton";
import AllUsers from "./Components/Pages/Dashboard/AllUsers/AllUsers";
import AddProduct from "./Components/Pages/Dashboard/AddProduct/AddProduct";
import AddReview from "./Components/Pages/Dashboard/AddReview/AddReview";
import ProductDetails from "./Components/Pages/Home/ProductDetails/ProductDetails";
import MyOrders from "./Components/Pages/Dashboard/MyOrders/MyOrders";
import RequireAdmin from "./Components/Pages/Login/RequireAdmin/RequireAdmin";
import ManageOrder from "./Components/Pages/Dashboard/ManageOrder/ManageOrder";
import Payment from "./Components/Pages/Dashboard/Payment/Payment";
import Products from "./Components/Pages/Products/Products";
import PaymentHistory from "./Components/Pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageProducts from "./Components/Pages/Dashboard/ManageProducts/ManageProducts";
import AddTeamMember from "./Components/Pages/Dashboard/AddTeamMember/AddTeamMember";
import ManageReviews from "./Components/Pages/Dashboard/ManageReviews/ManageReviews";
import Blogs from "./Components/Pages/Blogs/Blogs";
import BlogDetails from "./Components/Pages/Blogs/BlogDetails";
import Contact from "./Components/Pages/Contact/Contact";

function App() {
  const [theme, setTheme] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <div data-theme={theme && "night"} className="App">
      {loading ? (
        <div id="preloader">
          <div id="loader"></div>
        </div>
      ) : (
        <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogDetails/:id" element={<BlogDetails />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard handleThemeChange={handleThemeChange} theme={theme} />
            </RequireAuth>
          }
        >
          <Route index element={<WelcomeDashboard />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <MyProfile />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="myOrders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="paymentHistory"
            element={
              <RequireAuth>
                <PaymentHistory />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="manageReviews"
            element={
              <RequireAdmin>
                <ManageReviews />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="allUsers"
            element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="addProduct"
            element={
              <RequireAdmin>
                <AddProduct />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="addTeamMember"
            element={
              <RequireAdmin>
                <AddTeamMember />
              </RequireAdmin>
            }
          ></Route>
          <Route path="addReview" element={<AddReview />}></Route>
          <Route
            path="manageOrder"
            element={
              <RequireAdmin>
                <ManageOrder />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="payment/:paymentId"
            element={
              <RequireAuth>
                <Payment></Payment>
              </RequireAuth>
            }
          ></Route>
        </Route>
        <Route
          path="/purchase/:id"
          element={
            <RequireAuth>
              <ProductDetails />
            </RequireAuth>
          }
        />
        <Route path="/teamMembers" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollButton></ScrollButton>
      <Toaster />
    </div>
  );
}

export default App;
