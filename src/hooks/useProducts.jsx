import { useEffect, useState } from "react";
import { BASE_API } from "../config";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${BASE_API}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.result);
        setLoading(true);
      });
  }, []);
  return [products, loading, setProducts];
};

export default useProduct;
