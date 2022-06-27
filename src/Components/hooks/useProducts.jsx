import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.result);
        setLoading(true);
      });
  }, []);
  return [products, loading, setProducts];
};

export default useProduct;
