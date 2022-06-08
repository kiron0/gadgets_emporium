import React from "react";
import Fade from "react-reveal/Fade";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import Loading from "../Shared/Loading/Loading";
import TItle from "../Shared/Title/Title";
import Product from "./Product";

const Products = () => {
  useTitle("Shop");
  const { data: products, isLoading } = useQuery("products", async () => {
    const res = await fetch("http://localhost:5000/products", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    return data;
  });

  if (isLoading || products?.length === undefined) {
    return <Loading></Loading>;
  }

  return (
    <div className="pb-24 px-3">
      <div className="breadcrumb text-center py-20 bg-base-300">
        <h2 className="text-3xl">Shop Page</h2>
        <div className="text-md breadcrumbs ">
          <ul className="justify-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Contact </li>
          </ul>
        </div>
      </div>
      <TItle
        title="Our Awesome Products"
        subTitle="What Products we can provide?"
      />
      <Fade bottom distance="30px">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 mx-auto px-6 md:px-10 lg:px-36">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </Fade>
    </div>
  );
};

export default Products;
