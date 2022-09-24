import React from "react";
import { toast } from "react-hot-toast";
import { BASE_API } from "../../../../config";
import auth from "../../Shared/Firebase/Firebase.init";
const AddBlog = () => {
  /*   Handle Create Brand New Post For Users */
  const handleCreatePostForm = async (event) => {
    event.preventDefault();
    const title = event.target.title.value.trim();
    const category = event.target.category.value.trim();
    const description = event.target.description.value.trim();
    const blogData = {
      title: title,
      category: category,
      description: description,
      createAt: new Date().toDateString(),
      author: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
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
          event.target.reset();
        }
      });
  };
  return (
    <div className="py-4 my-4 lg:px-2">
      <h3 className="text-2xl font-semibold my-2">Add Blogs</h3>
      <form
        onSubmit={handleCreatePostForm}
        action=""
        className="shadow py-10 px-6 rounded flex flex-col gap-4"
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
          ></textarea>
        </div>
        <div>
          <button className="btn btn-primary my-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
