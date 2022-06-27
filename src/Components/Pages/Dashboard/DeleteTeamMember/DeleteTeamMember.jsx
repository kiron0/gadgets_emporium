import React from "react";
import { useQuery } from "react-query";
import Loader from "../../Shared/Loader/Loader";
import Fade from "react-reveal/Fade";
import TeamCard from "./TeamCard";

const DeleteTeamMember = () => {
  const {
    data: teamMembers,
    isLoading,
    refetch,
  } = useQuery(["teamMembers"], () =>
    fetch(`http://localhost:5000/teamMembers`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (
    isLoading ||
    !teamMembers ||
    teamMembers?.length === 0 ||
    teamMembers?.length === undefined
  ) {
    return <Loader />;
  }
  return (
    <>
      <div className="title my-2 mb-6 p-4">
        <h3 className="text-2xl font-semibold">Manage Team Members</h3>
        <span>
          You can manage all the team members who are connected with the
          projects.
        </span>
      </div>
      <section className="teamMembers py-2 lg:py-10 lg:px-16 px-6 sm:px-0">
        <div className="container mx-auto">
          <Fade bottom distance="30px">
            <div className="teamMembers-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
              {teamMembers?.map((team) => (
                <TeamCard key={team._id} {...team} refetch={refetch} />
              ))}
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
};

export default DeleteTeamMember;
