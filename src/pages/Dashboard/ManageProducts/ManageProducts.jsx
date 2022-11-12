import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { BASE_API } from "../../../config";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Loader/Loader";
import ProductsRow from "./ProductsRow";
import useScrollToTop from "../../../hooks/useScrollToTop";
const ManageProducts = () => {
  useTitle("Manage Product");
  useScrollToTop();
  const [modalProduct, setModalProduct] = useState({});
  const { data, isLoading, refetch } = useQuery(["products"], () =>
    fetch(`${BASE_API}/products`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const productData = data;

  /* Handle Update Stock Product */
  const [productNameField, setProductNameField] = useState("");
  const [availableQtyField, setAvailableQtyField] = useState("");
  const [orderQtyField, setOrderQtyField] = useState("");
  const [priceField, setPriceField] = useState("");

  const handleUpdateStock = async (event) => {
    event.preventDefault();

    if (availableQtyField < 0) {
      toast.error("Stock can't be negative!");
      return;
    }

    await fetch(`${BASE_API}/products/update-stock/${modalProduct._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productName: productNameField || modalProduct?.productName,
        availableQty: Number(availableQtyField || modalProduct?.availableQty),
        orderQty: Number(orderQtyField || modalProduct?.orderQty),
        price: Number(priceField || modalProduct?.price),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          refetch();
          toast.success(
            `${modalProduct?.productName} product updated successfully`
          );
          setModalProduct(null);
        }
      });
  };

  return (
    <div className="p-4">
      <div className="title my-2 mb-6">
        <h3 className="text-2xl font-semibold">Manage Products</h3>
        <span>You can manage all the product which one ordered users</span>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <Loader />
        ) : productData.length > 0 ? (
          <>
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Creator</th>
                  <th>Available Quantity</th>
                  <th>Maximum Quantity</th>
                  <th>Price</th>
                  <th>Update Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, ind) => (
                  <ProductsRow
                    key={product._id}
                    {...product}
                    serialize={ind}
                    refetch={refetch}
                    setModalProduct={setModalProduct}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "No product available yet."
        )}
      </div>
      {modalProduct && (
        <>
          <input type="checkbox" id="productModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box relative">
              <h3 className="text-lg font-bold">{modalProduct?.productName}</h3>
              <p>Update Your Product Details From Here</p>
              <form onSubmit={handleUpdateStock} action="" className="my-2">
                <div className="name border rounded p-3 relative mt-6">
                  <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                    <h3 className="text-xs font-poppins">
                      Put Your Product Name
                    </h3>
                  </div>
                  <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
                    <div className="icon">
                      <i className="bx bxs-hot"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="Put Your Product Name"
                      className="input focus:outline-none w-full my-3"
                      id="stock"
                      value={productNameField || modalProduct?.productName}
                      onChange={(event) =>
                        setProductNameField(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="name border rounded p-3 relative mt-8">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">
                        Available Quantity
                      </h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
                      <div className="icon">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="number"
                        placeholder="Put Your Quantity"
                        className="input focus:outline-none w-full my-3"
                        id="stock"
                        value={availableQtyField || modalProduct?.availableQty}
                        onChange={(event) =>
                          setAvailableQtyField(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="name border rounded p-3 relative mt-8">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">
                        Minimum Quantity
                      </h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
                      <div className="icon">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="number"
                        placeholder="Put Your Quantity"
                        className="input focus:outline-none w-full my-3"
                        id="stock"
                        value={orderQtyField || modalProduct?.orderQty}
                        onChange={(event) =>
                          setOrderQtyField(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="name border rounded p-3 relative mt-8">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">Put Your Price</h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
                      <div className="icon">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="number"
                        placeholder="Put Your Price"
                        className="input focus:outline-none w-full my-3"
                        id="stock"
                        value={priceField || modalProduct.price}
                        onChange={(event) => setPriceField(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-action">
                  <label htmlFor="productModal" className="btn btn-warning">
                    <i className="bx bx-x text-xl"></i> Close
                  </label>
                  <button className="btn text-white">Update Product</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
