import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

export default function MyReviews() {
  useTitle("My Reviews");
  const { pathname } = useLocation();
  return (
    <div>
      <div className="p-4 my-5 bg-white">
        <div className="title  sm:flex  items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">My Reviews</h1>
            {/* <small className="badge badge-success">all</small> */}
          </div>
          <div className="flex items-center rounded overflow-hidden mt-5 sm:mt-0">
            <Link
              className={`p-3 font-poppins rounded-none ${
                pathname.includes("my-reviews") ||
                pathname === "/dashboard/reviews"
                  ? "bg-success"
                  : "bg-base-300"
              } `}
              to="/dashboard/reviews/my-reviews"
            >
              Reviews
            </Link>
            <Link
              className={`p-3 font-poppins rounded-none ${
                pathname.includes("add-review") ? "bg-success" : "bg-base-300"
              } `}
              to="/dashboard/reviews/add-review"
            >
              Add Review
            </Link>
          </div>
        </div>
        <div className="review-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
