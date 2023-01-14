import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import Navbar from "./shared/Navbar/Navbar";
import Home from "./pages/Home/Home/Home";
import NotFound from "./shared/NotFound/NotFound";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Team from "./pages/Team/Team";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import WelcomeDashboard from "./pages/Dashboard/WelcomeDashboard/WelcomeDashboard";
import RequireAuth from "./auth/RequireAuth/RequireAuth";
import MyProfile from "./pages/Dashboard/MyProfile/MyProfile";
import ScrollButton from "./shared/ScrollButton/ScrollButton";
import AllUsers from "./pages/Dashboard/AllUsers/AllUsers";
import AddProduct from "./pages/Dashboard/AddProduct/AddProduct";
import AddReview from "./pages/Dashboard/AddReview/AddReview";
import ProductDetails from "./pages/Home/ProductDetails/ProductDetails";
import MyOrders from "./pages/Dashboard/MyOrders/MyOrders";
import RequireAdmin from "./auth/RequireAdmin/RequireAdmin";
import ManageOrder from "./pages/Dashboard/ManageOrder/ManageOrder";
import Payment from "./pages/Dashboard/Payment/Payment";
import Products from "./pages/Products/Products";
import PaymentHistory from "./pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageProducts from "./pages/Dashboard/ManageProducts/ManageProducts";
import ManageReviews from "./pages/Dashboard/ManageReviews/ManageReviews";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/Blogs/BlogDetails";
import Contact from "./pages/Contact/Contact";
import BlogManagement from "./pages/Dashboard/BlogManagement/BlogManagement";
import ManageBlog from "./pages/Dashboard/BlogManagement/ManageBlog";
import EditBlog from "./pages/Dashboard/BlogManagement/EditBlog";
import AddBlog from "./pages/Dashboard/BlogManagement/AddBlog";
import useProfileImage from "./hooks/useProfileImage";
import auth from "./auth/Firebase/Firebase.init";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ThemeChanger from "./shared/ThemeChanger/ThemeChanger";
import Setting from "./pages/Dashboard/Setting/Setting";
import axios from "axios";
import { useQuery } from "react-query";
import { BASE_API } from "./config";
import FeatureRequest from "./pages/Dashboard/FeatureRequest/FeatureRequest";
import MyReviews from "./pages/Dashboard/MyReviews/MyReviews";
import UserReviews from "./pages/Dashboard/MyReviews/UserReviews";

export const InitializeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [user] = useAuthState(auth);
  const [image] = useProfileImage(user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme") || "light");
  }, []);

  const { data, refetch } = useQuery("appName", async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  return (
    <InitializeContext.Provider value={{ theme, setTheme, image, appName }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div data-theme={theme ? theme : "light"} className="bg-base-100">
          <Navbar />
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
                  <Dashboard />
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
                path="featureRequest"
                element={
                  <RequireAuth>
                    <FeatureRequest />
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
                path="setting"
                element={
                  <RequireAdmin>
                    <Setting appChangeRefetch={refetch} />
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
              <Route path="reviews" element={<MyReviews />}>
                <Route index element={<UserReviews />} />
                <Route path="my-reviews" element={<UserReviews />} />
                <Route path="add-review" element={<AddReview />} />
              </Route>
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
                    <Payment />
                  </RequireAuth>
                }
              ></Route>
              <Route path="management-blog" element={<BlogManagement />}>
                <Route index element={<AddBlog />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="manageBlogs" element={<ManageBlog />} />
                <Route path="edit/:editId" element={<EditBlog />} />
              </Route>
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
          {isLoading ? null : <ThemeChanger />}
          <ScrollButton />
          <Toaster />
        </div>
      )}
    </InitializeContext.Provider>
  );
}

export default App;
