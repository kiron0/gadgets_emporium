import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
import useBlog from "../../../hooks/useBlog";
import auth from "../../Shared/Firebase/Firebase.init";
import { BASE_API } from "../../../../config";

const EditBlog = () => {
  const navigate = useNavigate();
  const { editId } = useParams();
  const [blogs, loading] = useBlog();
  if (!loading) return <Loader />;
  const findBlog = blogs?.find((blog) => blog._id === editId);
  const handleUpdateBLog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value.trim();
    const category = event.target.category.value.trim();
    const description = event.target.description.value.trim();
    const blogData = {
      title: title,
      category: category,
      description: description,
      createAt: new Date().toDateString(),
    };
    await fetch(
      `${BASE_API}/blogs?uid=${auth?.currentUser?.uid}&&editId=${editId}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          event.target.reset();
          navigate(`/dashboard/management-blog/manageBlogs`);
        }
      });
  };
  return (
    <div className="py-4 my-4">
      <h3 className="text-2xl font-semibold my-2 ml-4">Update Blogs</h3>
      <form
        onSubmit={handleUpdateBLog}
        action=""
        className="shadow px-5 py-10 rounded flex flex-col gap-4"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Title"
            id="title"
            required
            name="title"
            defaultValue={findBlog?.title}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Category"
            name="category"
            id="category"
            defaultValue={findBlog?.category}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            className="textarea textarea-bordered w-full"
            rows="5"
            required
            defaultValue={findBlog?.description}
          ></textarea>
        </div>
        <div>
          <button className="btn btn-primary my-2">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
