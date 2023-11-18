"use client";

import CreateCourse from "@/app/components/Dashboard/Course/CreateCourse";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import DashboardHero from "@/app/components/Dashboard/DashboardHero";
import DashboardSidebar from "@/app/components/Dashboard/Sidebar/DashboardSidebar";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Learnbay"
        description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
        keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <DashboardSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
