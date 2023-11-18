"use client";

import AllInvoives from "@/app/components/Dashboard/Orders/AllInvoices";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/app/components/Dashboard/Sidebar/DashboardSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import DashboardHero from "@/app/components/Dashboard/DashboardHero";

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
          <div className=" w-1/5">
            <DashboardSidebar />
          </div>
          <div className="w-4/5 ">
            <DashboardHero />
            <AllInvoives />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
