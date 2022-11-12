import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import TItle from "../../../components/Title/Title";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../auth/Firebase/Firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import { BASE_API } from "../../../config";
import useScrollToTop from "../../../hooks/useScrollToTop";

const Products = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const { data: products, isLoading } = useQuery("allProducts", async () => {
    const res = await fetch(
      `${BASE_API}/products?sort=1`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await res.json();
    return data;
  });

  if (isLoading || products?.length === undefined) {
    return <Loader />;
  }

  return (
    <div className="md:py-28 lg:px-12">
      <TItle
        title="Our Awesome Products"
        subTitle="What Products we can provide?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-6 md:px-10 lg:px-16 py-8">
        {products
          ?.slice(0, 4)
          ?.map(
            ({
              _id,
              image,
              productName,
              productDescription,
              price,
              orderQty,
              availableQty,
            }) => (
              <div className="card bg-base-100 shadow-xl" key={_id}>
                <figure>
                  <img src={image} className="h-52 rounded-xl" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {productName}
                    <div className="badge badge-secondary text-white">NEW</div>
                  </h2>
                  <p>{productDescription?.slice(0, 60)}...</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-ghost bg-base-200">
                      <span title="Minimum Order Quantity">MOQ</span>-{" "}
                      {orderQty}pcs
                    </div>
                    <div className="badge badge-ghost bg-base-200">
                      Available- {availableQty}pcs
                    </div>
                    <div className="badge badge-ghost bg-base-200">
                      {price}$
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    {admin ? (
                      <div className="alert alert-error shadow-lg text-sm lg:text-base">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Hey, Admin! You can't order</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/purchase/${_id}`)}
                        className="btn btn-primary text-white mt-4"
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex justify-center items-center mt-10">
        <button
          onClick={() => navigate(`/shop`)}
          className="btn btn-primary text-white"
        >
          See More...
        </button>
      </div>
    </div>
  );
};

export default Products;
