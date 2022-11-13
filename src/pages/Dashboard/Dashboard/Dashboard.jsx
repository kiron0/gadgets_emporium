import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFire } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { MdOutlineWavingHand } from "react-icons/md";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import { InitializeContext } from "../../../App";
import useUserInfo from "../../../hooks/useUserInfo";
import { BsBell, BsBellSlash } from "react-icons/bs";

const Dashboard = () => {
  useTitle("Dashboard");
  const { image, appName } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const [userInfo] = useUserInfo(user);

  const [notificationCount, setNotificationCount] = useState(0);
  const [reports, setReports] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [reviews, setReviews] = useState(0);

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
            className="btn bg-base-100 duration-500 drawer-button lg:hidden text-black hover:text-white"
          >
            <BsGrid className="text-2xl" />
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

          {/* sdfhdgh dg */}

          <div className="dropdown dropdown-end">
            {/* Notification Button */}
            {admin && (
              <label tabIndex={0} className="btn btn-ghost btn-circle absolute -right-16 -top-6 lg:left-[25rem]">
                <div className="indicator">
                  <span className="text-xl">
                    <BsBell />
                  </span>
                  {notificationCount > 0 && (
                    <span className="badge badge-sm indicator-item badge-success text-white">
                      {notificationCount > 9 ? "+9" : notificationCount || 0}
                    </span>
                  )}
                </div>
              </label>
            )}

            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content sm:w-96 p-5 bg-base-100 shadow rounded ml-72"
            >
              <div className="notification-list flex flex-col gap-2">
                {notificationCount > 0 ? (
                  <>
                    {reports?.length > 0 && (
                      <>
                        <div>
                          <span className="my-2 text-sm block">Reports</span>
                          {reports?.slice(0, 2).map((report) => (
                            <div
                              key={report?._id}
                              className="notification-item flex items-center mb-2 gap-2 bg-gray-100 p-3 rounded"
                            >
                              <span className="text-sm">
                                <BsBell />
                              </span>
                              <span className="text-sm text-slate-400 flex  gap-2">
                                Someone has report your house{" "}
                                <Link
                                  to={`/dashboard/houses/reports/${report?.house}`}
                                  className="text-success underline"
                                >
                                  view
                                </Link>
                              </span>
                            </div>
                          ))}
                          {reports?.length > 2 && (
                            <span className="text-xs text-success">
                              2+ more reports
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {questions?.length > 0 && (
                      <>
                        <div>
                          <small className="my-2 block">Questions</small>
                          {questions?.slice(0, 2).map((question) => (
                            <div
                              key={question?._id}
                              className="notification-item flex mb-2 items-center gap-2 bg-gray-100 p-2 rounded"
                            >
                              <span className="text-sm">
                                <BsBell />
                              </span>
                              <span className="text-sm text-slate-400 flex  gap-2">
                                Someone has asked question for house{" "}
                                <Link
                                  to={`/dashboard/houses/questions/${question?.house}`}
                                  className="text-success underline"
                                >
                                  view
                                </Link>
                              </span>
                            </div>
                          ))}{" "}
                          {questions?.length > 2 && (
                            <span className="text-xs text-success">
                              2+ more questions
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {reviews?.length > 0 && (
                      <>
                        <div>
                          <small className="my-2 text-gray-600 block">
                            Reviews notifications
                          </small>
                          {reviews?.slice(0, 2).map((review) => (
                            <div
                              key={review?._id}
                              className="notification-item flex items-center gap-2 mb-2 bg-gray-100 p-2 rounded"
                            >
                              <span className="text-sm">
                                <BsBell />
                              </span>
                              <span className="text-sm text-slate-400 flex  gap-2">
                                Someone has reviewed for house{" "}
                                <Link
                                  to={`/dashboard/houses/reviews/${review?.house}`}
                                  className="text-success underline"
                                >
                                  view
                                </Link>
                              </span>
                            </div>
                          ))}{" "}
                          {reviews?.length > 2 && (
                            <span className="text-xs text-success">
                              2+ more reviews
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    <span
                      onClick={() => setNotificationCount(0)}
                      className="text-error mt-3 block font-poppins text-xs underline cursor-pointer"
                    >
                      clear notification
                    </span>
                  </>
                ) : (
                  <div className="py-5 grid place-items-center text-center">
                    <div className="text-center flex flex-col items-center gap-4">
                      <BsBellSlash className="text-2xl" />
                      <h4 className="text-xl font-poppins text-gray-500">
                        No Notifications
                      </h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* dgdzghjzdf */}

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
                    {userInfo?.displayName
                      ? userInfo?.displayName
                      : auth?.currentUser?.displayName}
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
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/addReview"
                >
                  <i className="bx bxs-star-half text-xl"></i> Add a review
                </NavLink>
              </li>
              {/* <li className="py-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-white bg-primary" : ""
                  }
                  to="/dashboard/featureRequest"
                >
                  <i className="bx bx-recycle text-xl"></i> Feature Request &
                  Bugs
                </NavLink>
              </li> */}
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
