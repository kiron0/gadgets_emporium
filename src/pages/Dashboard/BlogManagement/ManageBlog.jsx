import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import { BASE_API } from "../../../config";
const ManageBlog = () => {
  useTitle("Manage Blogs");
  const navigate = useNavigate();
  /* call to get all the added blogs for particular users */
  const { data, isLoading, refetch } = useQuery("blogs", () =>
    fetch(`${BASE_API}/blogs?uid=${auth?.currentUser?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading || data?.length === undefined) return <Loader />;

  const blogsData = data;

  /*  Handle Blog Delete */
  const handleDeleteBlog = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${BASE_API}/blogs?uid=${auth?.currentUser?.uid}&&deletedId=${id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              refetch();
              Swal.fire("Deleted!", "Your blogs has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Blog</h3>
      <div className="overflow-x-auto my-4">
        {blogsData?.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Edit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogsData?.map((blog, ind) => (
                <tr key={blog._id}>
                  <th>{ind + 1}</th>
                  <td>{blog?.title}</td>
                  <td>{blog?.category}</td>
                  <td>{blog?.views ? blog.views : 0}</td>
                  <td>{blog?.comment ? blog.comment : 0}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/management-blog/edit/${blog._id}`)
                      }
                      className="btn btn-xs btn-success text-white"
                    >
                      <AiFillEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold">No Blog created yet.</h2>
              <Link
                className="btn btn-primary my-6"
                to="/dashboard/management-blog/add-blog"
              >
                Add Blog
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageBlog;
