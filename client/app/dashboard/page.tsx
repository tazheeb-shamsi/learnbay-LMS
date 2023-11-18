"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import DashboardSidebar from "../components/Dashboard/Sidebar/DashboardSidebar";
import DashboardHero from "../components/Dashboard/DashboardHero";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Learnbay - Dashboard"
          description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
          keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
        />
        <div className="flex h-[200vh]">
          <div className=" w-1/5">
            <DashboardSidebar />
          </div>
          <div className="w-4/5 ">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
