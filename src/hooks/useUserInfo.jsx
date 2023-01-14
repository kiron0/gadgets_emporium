import { useEffect, useState } from "react";
import auth from "../auth/Firebase/Firebase.init";
import { BASE_API } from "../config";
import { useAuthState } from "react-firebase-hooks/auth";

const useUserInfo = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch(`${BASE_API}/users?uid=${auth?.currentUser?.uid}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data[0]);
        setIsLoading(true);
      });
  }, [user]);
  return [userInfo, isLoading, setUserInfo];
};

export default useUserInfo;
