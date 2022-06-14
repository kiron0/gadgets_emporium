import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://gadgets-emporium.herokuapp.com/blogs/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);
  return (
    <div className="blog-details py-28 h-screen">
      <div className="container mx-auto shadow-md rounded">
        <div className="card p-4 md:p-10">
          <div className="card-body">
            <div className="title flex items-center gap-3 my-3">
              <MdArrowBackIos
                onClick={() => navigate(-1)}
                className="cursor-pointer text-3xl md:text-sm lg:text-lg"
              />
              <h2 className="text-md lg:text-2xl font-semibold text-slate-500">
                {blog?.title}
              </h2>
            </div>
            <ul className="meta flex items-center gap-4 my-2 flex-wrap">
              <li>
                Category - <strong>{blog?.category}</strong>
              </li>
              <li>
                Author - <strong>{blog?.author?.name}</strong>
              </li>
            </ul>
            <p className="desc text-slate-500 leading-7 my-5 text-md">
              {blog?.description}
            </p>
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
