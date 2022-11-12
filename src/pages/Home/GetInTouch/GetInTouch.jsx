import React, { useState } from "react";
import Swal from "sweetalert2";
import useScrollToTop from "../../../hooks/useScrollToTop";
const GetInTouch = () => {
  useScrollToTop();
  const [error, setError] = useState("");
  const handleGetInTouchSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    if (!email) {
      return setError(`Field can't be empty.`);
    } else {
      setError(``);
    }
    Swal.fire(
      "Thanks for your Mail!",
      "I make sure you don't sent your spam mail!",
      "success"
    );
    event.target.reset();
  };
  return (
    <div className="container mx-auto z-10 relative py-10">
      <div className="content text-center px-4 py-10 md:py-14 lg:py-20 bg-base-200 rounded-lg md:mx-10 mb-[-5rem] shadow-lg">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
          Get In Touch
        </h1>
        <form
          onSubmit={handleGetInTouchSubmit}
          action=""
          className="lg:w-5/12 md:w-8/12 mx-auto flex items-stretch p-2 my-4 overflow-hidden rounded-full bg-base-100"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            className="w-full p-4 outline-none bg-transparent border-none"
          />
          <button className="px-10 bg-primary text-white rounded-full">
            Send{" "}
          </button>
        </form>
        {error && <small className="text-red-600">{error}</small>}
      </div>
    </div>
  );
};

export default GetInTouch;
