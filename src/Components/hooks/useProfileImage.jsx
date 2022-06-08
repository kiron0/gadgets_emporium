import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Pages/Shared/Firebase/Firebase.init";

const useProfileImage = () => {
  const [image, setImage] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `http://localhost:5000/users?uid=${auth?.currentUser?.uid}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await result.json();
      setImage(data[0].image);
    };
    fetchData();
  }, [user]);

  return [image];
};

export default useProfileImage;
