import { useEffect, useState } from "react";
import { BASE_API } from "../../config";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const uid = user?.user?.uid;
    const currentUser = { email: email, uid: uid };
    if (email) {
      fetch(
        `${BASE_API}/user?email=${email}&&uid=${uid}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
