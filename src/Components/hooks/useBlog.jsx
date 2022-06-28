import { useEffect, useState } from "react";

const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`https://gadgets-emporium.herokuapp.com/blogs/all`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(true);
        setBlogs(result);
      });
  }, []);
  return [blogs, loading, setBlogs];
};

export default useBlog;
