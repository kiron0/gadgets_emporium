import { useState, useEffect } from "react";
import auth from "../Pages/Shared/Firebase/Firebase.init";

const useProfileImage = (user) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://gadgets-emporium.herokuapp.com/users?uid=${auth?.currentUser?.uid}`
      );
      const data = await result.json();
      setImage(data[0]?.image);
    };
    fetchData();
  }, [user, image]);

  return [image];
};

export default useProfileImage;
