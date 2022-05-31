import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import auth from "../../Shared/Firebase/Firebase.init";

const AddProduct = () => {
  useTitle("Add Product");
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

    await fetch(`http://localhost:5000/products`, {
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
        <div className="my-2">
          <label htmlFor="name" className="my-2">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
            {...register("productName", { required: true })}
          />
          {errors.productName?.type === "required" && (
            <span className="text-error">Product name is required</span>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <div className="my-2 w-full">
            <label htmlFor="availableProduct" className="my-2">
              Available Product Quantity
            </label>
            <input
              type="number"
              placeholder="Available Product Quantity"
              className="input input-bordered w-full"
              id="availableProduct"
              {...register("availableProductQty", { required: true })}
            />
            {errors.availableProductQty?.type === "required" && (
              <span className="text-error">
                Available Product Quantity is required
              </span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="maximum" className="my-2">
              Maximum Product Quantity
            </label>
            <input
              type="number"
              placeholder="Maximum Product Quantity"
              className="input input-bordered w-full"
              {...register("maximumOrderQty", { required: true })}
            />
            {errors.maximumOrderQty?.type === "required" && (
              <span className="text-error">
                Maximum Order Quantity is required
              </span>
            )}
          </div>
          <div className="my-2 w-full">
            <label htmlFor="name" className="my-2">
              Product Per Price
            </label>
            <input
              type="number"
              placeholder="Product Per Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <span className="text-error">Price Field is required</span>
            )}
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="name" className="my-2">
            Product Description
          </label>
          <textarea
            name=""
            id="desc"
            className="textarea textarea-bordered w-full my-1"
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
            <input
              type="url"
              name="file"
              className="input input-bordered w-full"
              placeholder="Put Your Image Link"
              id="file"
              {...register("imageUrl", { required: true })}
            />
          ) : (
            <input
              type="file"
              name="file"
              className="block border p-2 w-full rounded"
              id="file"
              {...register("productImage", { required: true })}
            />
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
            {!loading ? "Sending Product..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
