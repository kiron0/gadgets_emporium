import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const BlogManagement = () => {
  const location = useLocation();
  const path = location?.pathname;
  useTitle(`Blog Management`);

  return (
    <div>
      <div className="title text-center py-10">
        <h3 className="text-3xl font-semibold">Blog Management</h3>
        <span className="text-sm">Here you can manage your own blogs</span>
        <div className="btn-group justify-center mt-5">
          <NavLink
            to="/dashboard/management-blog/add-blog"
            className={`btn btn-outline btn-primary  ${
              path.includes("add-blog") ? "btn-active" : " "
            }`}
          >
            Add Blog
          </NavLink>
          <NavLink
            to="/dashboard/management-blog/manageBlogs"
            className={`btn btn-outline btn-primary ${
              path.includes("manageBlogs") ? "btn-active" : " "
            }`}
          >
            Blog Management
          </NavLink>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default BlogManagement;
