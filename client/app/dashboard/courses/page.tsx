"use client";
import AllCourses from "@/app/components/Dashboard/Course/AllCourses";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/app/components/Dashboard/Sidebar/DashboardSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Learnbay"
          description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
          keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <DashboardSidebar />
          </div>
          <div className="w-[85%] ">
            <DashboardHeader />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;