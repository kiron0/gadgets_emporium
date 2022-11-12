import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import auth from "../../../auth/Firebase/Firebase.init";
import useScrollToTop from "../../../hooks/useScrollToTop";

const AddProduct = () => {
  useTitle("Add Product");
  useScrollToTop();
  const upload_api_key = `e1a6a4f77bc884f9b46b0d06d86c05e5`;
  const [isFile, setIsFile] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState("false");
  const onSubmit = (data) => {
    setLoading(false);
    if (!isFile) {
      const url = `https://api.imgbb.com/1/upload?key=${upload_api_key}`;

      const formData = new FormData();
      const image = data.productImage[0];
      formData.append("image", image);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.success) {
            saveProductOnMongodb(result?.data?.url, data);
            setLoading(true);
          }
        });
    } else {
      const inputURL = data.imageUrl;
      saveProductOnMongodb(inputURL, data);
      setLoading(true);
    }
  };

  const saveProductOnMongodb = async (image, data) => {
    const productData = {
      productName: data?.productName,
      availableQty: data?.availableProductQty,
      orderQty: data?.maximumOrderQty,
      price: data?.price,
      productDescription: data?.productDescription,
      image: image,
      createdAt: new Date().toDateString(),
      creator: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
      },
    };

    await fetch(`${BASE_API}/products`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.insertedId) {
          toast.success("Product Added Successfully");
          reset();
        }
      });
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold mb-2">Add Product</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="shadow rounded bg-base-100 p-5 md:p-10"
      >
        <div className="name border rounded p-3 relative">
          <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
            <h3 className="text-xs font-poppins select-none">Product Name</h3>
          </div>
          <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
            <div className="icon">
              <i className="bx bxs-hot"></i>
            </div>
            <input
              type="text"
              placeholder="Product Name"
              className="input focus:outline-none w-full max-w-md"
              {...register("productName", { required: true })}
            />
            {errors.productName?.type === "required" && (
              <span className="text-error">Product name is required</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          <div className="name border rounded p-3 relative mt-6">
            <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
              <h3 className="text-xs font-poppins select-none">
                Available Product Quantity
              </h3>
            </div>
            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
              <div className="icon">
                <i className="bx bxs-hot"></i>
              </div>
              <input
                type="number"
                placeholder="Available Product Quantity"
                className="input focus:outline-none w-full"
                id="availableProduct"
                {...register("availableProductQty", { required: true })}
              />
              {errors.availableProductQty?.type === "required" && (
                <span className="text-error">
                  Available Product Quantity is required
                </span>
              )}
            </div>
          </div>
          <div className="name border rounded p-3 relative mt-6">
            <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
              <h3 className="text-xs font-poppins select-none">
                Maximum Product Quantity
              </h3>
            </div>
            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
              <div className="icon">
                <i className="bx bxs-hot"></i>
              </div>
              <input
                type="number"
                placeholder="Maximum Product Quantity"
                className="input focus:outline-none w-full"
                {...register("maximumOrderQty", { required: true })}
              />
              {errors.maximumOrderQty?.type === "required" && (
                <span className="text-error">
                  Maximum Order Quantity is required
                </span>
              )}
            </div>
          </div>
          <div className="name border rounded p-3 relative mt-6">
            <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
              <h3 className="text-xs font-poppins select-none">
                Product Per Price
              </h3>
            </div>
            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
              <div className="icon">
                <i className="bx bxs-hot"></i>
              </div>
              <input
                type="number"
                placeholder="Product Per Price"
                className="input focus:outline-none w-full"
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <span className="text-error">Price Field is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="name border rounded p-3 relative mt-6">
          <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
            <h3 className="text-xs font-poppins select-none">
              Product Description
            </h3>
          </div>
          <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
            <div className="icon">
              <i className="bx bxs-hot"></i>
            </div>
            <textarea
              name=""
              id="desc"
              className="textarea focus:outline-none w-full my-1"
              cols="30"
              placeholder="Product Description"
              rows="2"
              {...register("productDescription", { required: true })}
              style={{ resize: "none", height: "6rem" }}
            ></textarea>
            {errors.productDescription?.type === "required" && (
              <span className="text-error">
                Product Description Field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="file" className="my-2 block">
            Image
            <button
              type="button"
              className="btn btn-xs mx-2 text-white"
              onClick={() => setIsFile((prev) => !prev)}
            >
              {isFile ? "Upload" : "URL"}
            </button>
          </label>
          {isFile ? (
            <div className="name border rounded p-3 relative mt-6">
              <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                <h3 className="text-xs font-poppins select-none">
                  Put Your Image Link
                </h3>
              </div>
              <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
                <div className="icon">
                  <i className="bx bxs-hot"></i>
                </div>
                <input
                  type="url"
                  name="file"
                  className="input focus:outline-none w-full"
                  placeholder="Put Your Image Link"
                  id="file"
                  {...register("imageUrl", { required: true })}
                />
              </div>
            </div>
          ) : (
            <div className="name border rounded p-3 relative mt-6">
              <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                <h3 className="text-xs font-poppins select-none">
                  Choose Your Image
                </h3>
              </div>
              <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 w-full overflow-hidden">
                <div className="icon">
                  <i className="bx bxs-hot"></i>
                </div>
                <input
                  type="file"
                  name="file"
                  className="file-input file-input-ghost focus:outline-none w-full rounded-lg"
                  id="file"
                  {...register("productImage", { required: true })}
                />
              </div>
            </div>
          )}

          {errors.productImage?.type === "required" ||
            (errors.imageUrl?.type === "required" && (
              <span className="text-error">
                Product Image Field is required
              </span>
            ))}
        </div>
        <div className="my-3 text-right">
          <button
            className="btn btn-primary text-white"
            disabled={!loading && true}
          >
            {!loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
