import React, { useEffect, useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineFire } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import auth from "../../auth/Firebase/Firebase.init";
import { InitializeContext } from "../../App";
import useUserInfo from "../../hooks/useUserInfo";

const Navbar = () => {
  const { appName } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [userInfo] = useUserInfo(user);
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user.displayName} to stay with us!`, {
      position: "bottom-left",
      autoClose: 5000,
    });
  };

  const NavbarMenus = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : ""
          }
          to="/shop"
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : ""
          }
          to="/blogs"
        >
          Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : ""
          }
          to="/teamMembers"
        >
          Team
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-white uppercase bg-primary" : ""
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 w-full z-50">
      <div
        className={`drawer-content flex flex-col bg-base-100 shadow-md ${
          scrollY > 100 && "duration-500"
        }`}
        style={
          pathname.includes("dashboard")
            ? { display: "none" }
            : { display: "flex" }
        }
      >
        <div className="navbar py-3 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <CgMenuLeft className="text-3xl" />
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
              >
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <AiOutlineFire className="hidden lg:block text-2xl" />{" "}
              {!user ? (
                <span className="text-lg md:text-xl">{appName}</span>
              ) : (
                <span className="ml-[-17px] md:ml-0">{appName}</span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-primary text-white"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div
                    style={{ display: "grid" }}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                  >
                    {auth?.currentUser?.photoURL && !userInfo?.image ? (
                      <img src={auth?.currentUser?.photoURL} alt="profile" />
                    ) : !auth?.currentUser?.photoURL && userInfo?.image ? (
                      <img src={userInfo?.image} alt="profile" />
                    ) : (
                      <img
                        src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                        alt="profile"
                      />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content bg-base-100 rounded-box w-72"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                    {auth?.currentUser?.photoURL && !userInfo?.image ? (
                      <img
                        src={auth?.currentUser?.photoURL}
                        alt="profile"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : !auth?.currentUser?.photoURL && userInfo?.image ? (
                      <img
                        src={userInfo?.image}
                        alt="profile"
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <img
                        src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                        alt="profile"
                        className="w-16 h-16 rounded-full"
                      />
                    )}
                  </div>
                  <div className="text-center mb-4">
                    <h2 className="font-semibold text-lg">
                      {userInfo?.displayName
                        ? userInfo?.displayName
                        : auth?.currentUser?.displayName}
                    </h2>

                    <Link to="/dashboard/profile">
                      <button className="btn btn-primary mt-4 rounded-full text-white">
                        View Profile
                      </button>
                    </Link>
                  </div>
                  <hr className="font-semibold" />
                  <li className="py-1 font-semibold">
                    <Link
                      className={({ isActive }) =>
                        isActive ? "text-white py-3 bg-primary" : "py-3"
                      }
                      to="/dashboard"
                    >
                      <i className="bx bxs-dashboard"></i> Dashboard
                    </Link>
                  </li>
                  <li className="py-1">
                    <button
                      onClick={handleLogOut}
                      className="py-3 font-semibold"
                    >
                      <i className="bx bx-log-out font-semibold"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
