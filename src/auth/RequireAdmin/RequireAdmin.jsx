import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../components/Loading/Loading";
import auth from "../../auth/Firebase/Firebase.init";

const RequireAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);
  const location = useLocation();

  if (loading || adminLoading) {
    return <Loading></Loading>;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAdmin;
