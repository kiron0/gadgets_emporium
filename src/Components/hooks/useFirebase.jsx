import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import auth from "../Pages/Firebase/firebase.init";
const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  /* provider login  */
  const loginWithSocial = async (provider) => {
    await signInWithPopup(auth, provider)
      .then(() => {
        toast.success(`Sign In successfully done.`);
        setLoading(true);
      })
      .catch((err) => {
        toast.error(err?.message?.split(":")[1]);
      });
  };

  /* setup auth state */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return { loginWithSocial, user, loading, isAuth };
};

export default useFirebase;
