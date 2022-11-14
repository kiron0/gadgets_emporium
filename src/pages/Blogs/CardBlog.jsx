import React from "react";
import { Link } from "react-router-dom";

const CardBlog = ({ blog }) => {
  const { _id, category, title, description } = blog;
  return (
    <div className="p-4 lg:w-1/3">
      <div className="h-full shadow-md bg-base-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <h2 className="tracking-widest text-xs title-font font-medium mb-1">
          {category}
        </h2>
        <h1 className="title-font sm:text-2xl text-xl font-medium mb-3">
          {title}
        </h1>
        <p className="leading-relaxed mb-3">{description?.slice(0, 80)}</p>
        <Link
          to={`/blogDetails/${_id}`}
          className="text-indigo-500 inline-flex items-center"
          href="/"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CardBlog;
