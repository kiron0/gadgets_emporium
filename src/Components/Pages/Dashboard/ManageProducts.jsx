import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";

const ManageProducts = () => {
  const { data: parts, isLoading } = useQuery("ManageAllParts", async () => {
    const res = await fetch("https://gadgets-emporium.herokuapp.com/parts", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    return data;
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="bg-base-300 rounded-lg">
      <h2 className="flex justify-center py-8 text-3xl">Manage All Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-28 mx-auto px-6 md:px-10">
        {parts.map((part) => (
          <div
            className="card w-full bg-base-100 px-4 shadow-lg"
            key={part._id}
          >
            <figure>
              <img src={part.img} alt="" className="rounded-xl w-60" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{part.title}</h2>
              <p className="card-text font-bold">
                Price: <span className="text-primary">${part.price}</span>
              </p>
              <p className="card-text">
                {part.description?.slice(0, 80)}
                {part.description?.length > 100 && (
                  <span title={`${part.description}`}>...read more</span>
                )}
              </p>
              <div className="flex justify-center items-center gap-4">
                <button className="btn btn-primary text-white">Ship</button>
                <button className="btn btn-secondary text-white">Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
