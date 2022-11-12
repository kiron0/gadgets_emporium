import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";

const Contact = () => {
  useTitle("Contact");
  useScrollToTop();

  const handleContactForm = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    Swal.fire(
      "Thanks for contacting us!!",
      ` We received your email! ${name}. We knock you soon on your ${email}`,
      "success"
    );
    event.target.reset();
  };
  return (
    <section className="contact py-16">
      <div className="breadcrumb text-center py-20 bg-base-200">
        <h2 className="text-3xl">Contact Page</h2>
        <div className="text-md breadcrumbs ">
          <ul className="justify-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Contact </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto">
        <section className="body-font relative">
          <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="lg:w-2/3 md:w-1/2 bg-base-100 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameBorder="0"
                title="map"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                style={{ filter: `grayscale(1) contrast(1.2) opacity(0.4)` }}
              ></iframe>
              <div className="bg-base-100 relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold  tracking-widest text-xs">
                    ADDRESS
                  </h2>
                  <p className="mt-1">
                    Photo booth tattooed prism, portland taiyaki hoodie neutra
                    typewriter
                  </p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold  tracking-widest text-xs">
                    EMAIL
                  </h2>
                  <a className="text-indigo-500 leading-relaxed" href="/">
                    example@email.com
                  </a>
                  <h2 className="title-font font-semibold tracking-widest text-xs mt-4">
                    PHONE
                  </h2>
                  <p className="leading-relaxed">123-456-7890</p>
                </div>
              </div>
            </div>
            <form
              onSubmit={handleContactForm}
              className="lg:w-1/3 md:w-1/2 bg-base-100 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
            >
              <h2 className="text-lg mb-1 font-medium title-font">
                Contact With Us
              </h2>
              <p className="leading-relaxed mb-5">
                Post-ironic portland shabby chic echo park, banjo fashion axe
              </p>
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-base-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-base-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-base-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  required
                ></textarea>
              </div>
              <button className="text-white btn btn-primary border-0 py-2 px-6 focus:outline-none  rounded text-lg">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;
