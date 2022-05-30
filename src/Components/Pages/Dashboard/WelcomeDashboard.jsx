import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useTitle from "../../hooks/useTitle";
import auth from "../Firebase/firebase.init";

const WelcomeDashboard = () => {
  useTitle("Welcome Dashboard");
  const [user] = useAuthState(auth);
  return (
    <div className="p-5 grid place-items-center min-h-[80vh]">
      <h2 className="text-2xl lg:text-4xl font-bold text-primary py-10 px-2 text-center">
        Welcome back,
        <br />
        {user?.displayName}
      </h2>
    </div>
  );
};

export default WelcomeDashboard;
