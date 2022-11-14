import React from "react";
import { toast } from "react-hot-toast";
import { BASE_API } from "../../../config";
import auth from "../../../auth/Firebase/Firebase.init";
const AddBlog = () => {
  /*   Handle Create Brand New Post For Users */
  const handleCreatePostForm = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const category = e.target.category.value.trim();
    const description = e.target.description.value.trim();
    const blogData = {
      title: title,
      category: category,
      description: description,
      createAt: new Date().toDateString(),
      author: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        image: auth?.currentUser?.photoURL || "",
      },
    };

    await fetch(`${BASE_API}/blogs`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Blog Created Successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div className="py-4 my-4 lg:px-2">
      <h3 className="text-2xl font-semibold my-2">Add Blog</h3>
      <form
        onSubmit={handleCreatePostForm}
        action=""
        className="shadow py-10 px-6 rounded flex flex-col gap-4"
      >
        <div className="name border rounded p-3 relative">
          <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
            <h3 className="text-xs font-poppins select-none">Blog Title</h3>
          </div>
          <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
            <div className="icon">
              <i className="bx bxs-hot"></i>
            </div>
            <input
              className="input focus:outline-none w-full"
              type="text"
              placeholder="Title"
              id="title"
              required
              name="title"
            />
          </div>
        </div>

        <div className="name border rounded p-3 relative mt-6">
          <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
            <h3 className="text-xs font-poppins select-none">Blog Category</h3>
          </div>
          <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
            <div className="icon">
              <i className="bx bxs-hot"></i>
            </div>
            <input
              className="input focus:outline-none w-full"
              type="text"
              placeholder="Category"
              name="category"
              id="category"
              required
            />
          </div>
        </div>
        <div className="name border rounded p-3 relative mt-6">
          <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
            <h3 className="text-xs font-poppins select-none">
              Blog Description
            </h3>
          </div>
          <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
            <div className="icon">
              <i className="bx bxs-hot"></i>
            </div>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              cols="30"
              className="textarea focus:outline-none w-full"
              rows="5"
              required
            ></textarea>
          </div>
        </div>
        <div>
          <button className="btn btn-primary my-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
