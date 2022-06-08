import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsTools } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { BiLogInCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import auth from "../Firebase/Firebase.init";
import useCarts from "../../../hooks/useCarts";
import useProfileImage from "../../../hooks/useProfileImage";
import Loading from "../Loading/Loading";

const Navbar = ({ handleThemeChange, theme }) => {
  const [carts] = useCarts();
  const [image] = useProfileImage();
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();
  const [scrollY, setScrollY] = useState();

  useEffect(() => {
    setScrollY(window.scrollY);
  }, [scrollY]);

  const handleLogOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    toast.success(`Thank you, ${user.displayName} to stay with us!`, {
      autoClose: 5000,
    });
  };

  const NavbarMenus = (
    <>
      <li>
        <NavLink className="uppercase" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/shop">
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/blogs">
          Blogs
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/teamMembers">
          Team
        </NavLink>
      </li>

      <li>
        <NavLink className="uppercase" to="/contact">
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <Link className="uppercase bg-secondary text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  if (!image || image === undefined) {
    return <Loading />;
  }

  return (
    <div className="fixed top-0 w-full z-50">
      <div
        className={`drawer-content flex flex-col backdrop-blur-[18px] bg-base-100  ${
          scrollY < 300 && "lg:bg-transparent"
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
                <CgMenuGridO className="text-3xl" />
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {NavbarMenus}
              </ul>
            </div>
            <Link
              className="btn btn-ghost normal-case text-xl flex gap-2 items-center"
              to="/"
            >
              <BsTools className="hidden md:block" />{" "}
              {!user ? (
                <span className="text-sm md:text-xl lg:text-xl">
                  Gadgets Emporium
                </span>
              ) : (
                <span>Gadgets Emporium</span>
              )}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 gap-3">{NavbarMenus}</ul>
          </div>
          <div className="navbar-end gap-3">
            {/* <li className="list-none mt-2">
              <label for="AddToCart" className="modal-button indicator">
                <span class="indicator-item badge badge-secondary">
                  {carts ? <>{carts?.length}</> : 0}
                </span>
                <MdOutlineShoppingCart className="text-3xl cursor-pointer" />
              </label>
            </li> */}
            <li className="list-none">
              <button
                onClick={handleThemeChange}
                className="rounded-full lg:mx-2 font-bold pt-2 ml-2"
              >
                {theme ? (
                  <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </button>
            </li>
            {!user && (
              <NavLink
                to="/login"
                className="btn flex gap-2 items-center btn-primary"
              >
                <BiLogInCircle /> Login
              </NavLink>
            )}
            {user && (
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex="0"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      style={{ display: "grid" }}
                      className="w-10 h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      {auth?.currentUser?.photoURL ? (
                        <img
                          src={auth?.currentUser?.photoURL}
                          alt={auth?.currentUser?.displayName}
                        />
                      ) : (
                        <img src={image} alt={auth?.currentUser?.displayName} />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex="0"
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link className="justify-between" to="/dashboard/profile">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
