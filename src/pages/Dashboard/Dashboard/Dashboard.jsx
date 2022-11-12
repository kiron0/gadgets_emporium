import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFire } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineWavingHand } from "react-icons/md";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import { InitializeContext } from "../../../App";

const Dashboard = () => {
  useTitle("Dashboard");
  const { image, appName, theme } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      navigate("/");
      toast.success(`Thank you, ${user.displayName} to stay with us!`, {
        autoClose: 3000,
        position: "bottom-left",
      });
    });
  };

  if (isLoading || adminLoading) {
    return <Loader />;
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-3 md:p-3">
        <div className="header z-50 sticky top-0 flex justify-between items-center bg-base-100 p-4 py-3 rounded shadow-md">
          <label
            htmlFor="dashboard-sidebar"
            className="btn bg-base-100 duration-300 hover:text-white drawer-button lg:hidden "
          >
            <HiOutlineViewGrid
              className={
                theme === "night" || theme === "dark" || theme === "black"
                  ? "text-2xl text-white"
                  : "text-2xl text-black"
              }
            />
          </label>
          <div className="flex items-center gap-1">
            <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold hidden md:flex">
              Welcome to
            </h1>
            <Link
              to="/"
              className="text-lg lg:text-2xl md:text-2xl font-semibold text-primary"
            >
              {appName}
            </Link>
            <h1 className="text-lg lg:text-2xl md:text-2xl font-semibold hidden md:flex">
              {admin ? "Admin" : "Customer"} Panel
            </h1>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div
                style={{ display: "grid" }}
                className="w-10 h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt={auth?.currentUser?.displayName.slice(0, 1)}
                  />
                ) : (
                  <img
                    src={image}
                    alt={auth?.currentUser?.displayName.slice(0, 2)}
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-4 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-[16rem]"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                {auth?.currentUser?.photoURL ? (
                  <img
                    src={auth?.currentUser?.photoURL}
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <img
                    src={image}
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                )}
              </div>
              <div className="text-center mb-4">
                <span className="font-semibold">Hello,</span>
                <span className="flex justify-center items-center gap-1 font-semibold">
                  <h2 className="text-success">
                    {auth?.currentUser?.displayName}
                  </h2>
                  <MdOutlineWavingHand />
                </span>
                <div className="flex flex-col items-center gap-1 pt-2 md:hidden">
                  <h1 className="font-semibold">Welcome to</h1>
                  <span className="font-semibold text-primary">{appName}</span>
                  <h1 className="font-semibold">
                    {admin ? "Admin" : "Customer"} Panel
                  </h1>
                </div>
                <div className="flex justify-center">
                  <Link to="/dashboard/profile" className="hidden md:flex">
                    <button className="btn btn-primary mt-4 rounded-full text-white">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
              <hr className="font-semibold" />
              <li className="py-1 font-semibold md:hidden">
                <Link to="/dashboard/profile" className="py-3">
                  <i className="bx bxs-user font-semibold"></i> Profile
                </Link>
              </li>
              <li className="py-1">
                <button onClick={handleLogOut} className="py-3 font-semibold">
                  <i className="bx bx-log-out font-semibold"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side shadow-lg">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content shadow-md">
          <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b border-gray-500 pb-5">
            <Link
              to="/"
              className="logo font-semibold text-center flex items-center flex-col gap-2"
            >
              <AiOutlineFire className="text-3xl" />
              {appName}
            </Link>
            <div
              onClick={handleLogOut}
              className="badge badge-outline border-primary hover:bg-primary hover:text-white duration-500 cursor-pointer flex justify-center items-center gap-1 p-4"
            >
              <i className="bx bx-log-out"></i>
              Logout
            </div>
          </div>
          <li className="py-2 mt-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white bg-primary" : ""
              }
              to="/dashboard"
            >
              <i className="bx bxs-dashboard text-xl"></i> Dashboard
            </NavLink>
          </li>
          {!admin && (
            <>
              <li className="py-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/myOrders"
                >
                  <i className="bx bxs-ship text-xl"></i> My Orders
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink to="/dashboard/addReview">
                  <i className="bx bxs-star-half text-xl"></i> Add a review
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/paymentHistory"
                >
                  <i className="bx bxs-credit-card text-xl"></i> Payment History{" "}
                  <small className="badge badge-outline text-sm">New</small>
                </NavLink>
              </li>
            </>
          )}
          {admin && (
            <>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/addProduct"
                >
                  <i className="bx bx-cart-add text-xl"></i> Add a Product
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/allUsers"
                >
                  <i className="bx bxs-user-detail text-xl"></i> Manage Users
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/manageOrder"
                >
                  <i className="bx bxs-ship text-xl"></i> Manage Orders
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/manageProducts"
                >
                  <i className="bx bx-cart text-xl"></i> Manage Products
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/manageReviews"
                >
                  <i className="bx bxs-star-half text-xl"></i> Manage Reviews
                </NavLink>
              </li>
              <li className="py-1">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/setting"
                >
                  <i className="bx bx-cog text-xl"></i> Setting
                </NavLink>
              </li>
            </>
          )}
          <li className="py-1">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white bg-primary" : ""
              }
              to="/dashboard/management-blog"
            >
              <i className="bx bxl-blogger text-xl"></i> Blog Management{" "}
            </NavLink>
          </li>
          {/* <li className="absolute bottom-5 w-72">
            <button
              onClick={handleLogOut}
              className="bg-primary rounded-lg text-white"
            >
              <i className="bx bx-log-out"></i> Logout
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
