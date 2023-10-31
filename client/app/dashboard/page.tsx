"use client";
import React, { FC } from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import DashboardSidebar from "../components/Dashboard/Sidebar/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

type Props = {};

const page: FC<Props> = (props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Learnbay"
          description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
          keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <DashboardSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHeader />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
