import React from "react";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";
import Loader from "../Shared/Loader/Loader";
import TItle from "../Shared/Title/Title";
import client1 from "./assets/client-1.png";
import client2 from "./assets/client-2.png";
import client3 from "./assets/client-3.png";

const Team = () => {
  useTitle("Team");
  const { data: teamMembers, isLoading } = useQuery("teamMembers", async () => {
    const res = await fetch("http://localhost:5000/teamMembers", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.json();
    return data;
  });

  if (
    isLoading ||
    teamMembers?.length === undefined ||
    teamMembers === null ||
    !teamMembers ||
    teamMembers.length === 0
  ) {
    return <Loader />;
  }

  return (
    <div className="h-screen bg-base-100">
      <section className="body-font bg-base-100">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <TItle
              title="Our Projects Team"
              subTitle="What Products we can provide?"
            />
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client1}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Holden Caulfield</h2>
                  <p className="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client2}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Henry Letham</h2>
                  <p className="text-gray-500">CTO</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client3}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Oskar Blinde</h2>
                  <p className="text-gray-500">Founder</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client2}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">John Doe</h2>
                  <p className="text-gray-500">DevOps</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client1}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Martin Eden</h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client2}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Boris Kitua</h2>
                  <p className="text-gray-500">UX Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client3}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Atticus Finch</h2>
                  <p className="text-gray-500">QA Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client2}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Alper Kamu</h2>
                  <p className="text-gray-500">System</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center p-12 rounded-lg shadow-lg">
                <img
                  alt="team"
                  className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={client1}
                />
                <div className="flex-grow">
                  <h2 className="title-font font-medium">Rodrigo Monchi</h2>
                  <p className="text-gray-500">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
