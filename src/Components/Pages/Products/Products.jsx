import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import Product from "./Product";
import useProduct from "../../hooks/useProducts";
import { BASE_API } from "../../../config";

const Products = () => {
  useTitle("Shop");
  const [products, loading, setProducts] = useProduct();
  const [searchLoading, setSearchLoading] = useState(false);
  const HandleSearchProduct = async (event) => {
    event.preventDefault();
    const searchText = event.target.search.value;
    if (!searchText) return toast.error(`Search field is required.`);
    await fetch(
      `${BASE_API}/products/search?q=${searchText}`
    )
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setSearchLoading(true);
      });
  };

  return (
    <section id="shops" className="h-screen bg-base-100">
      <div className="breadcrumb text-center py-32 bg-base-300">
        <div className="container mx-auto px-3 lg:px-0">
          <h2 className="text-3xl">Shop Page</h2>
          <div className="text-md breadcrumbs ">
            <ul className="justify-center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Shop </li>
            </ul>
          </div>
          <form
            onSubmit={HandleSearchProduct}
            action=""
            className="search flex items-stretch p-2 px-4 bg-base-100 rounded-md w-full md:w-5/12 mx-auto my-2"
          >
            <input
              type="search"
              placeholder="Search Product..."
              className="p-4 outline-none w-full"
              name="search"
            />
            <button className="px-6 bg-primary text-white rounded-md">
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
      <Fade bottom distance="30px">
        <div className="container mx-auto py-20 px-6">
          {loading || searchLoading ? (
            products?.length > 0 ? (
              <div className="shop-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-semibold my-2">
                  No Products Found
                </h3>
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </Fade>
    </section>
  );
};

export default Products;
