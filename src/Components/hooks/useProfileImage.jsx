import { useState, useEffect } from "react";
import { BASE_API } from "../../config";
import auth from "../Pages/Shared/Firebase/Firebase.init";

const useProfileImage = (user) => {
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${BASE_API}/users?uid=${auth?.currentUser?.uid}`
      );
      const data = await result.json();
      setImage(data[0]?.image);
      setImageLoading(false);
    };
    fetchData();
  }, [user, image]);

  return [image, imageLoading];
};

export default useProfileImage;
