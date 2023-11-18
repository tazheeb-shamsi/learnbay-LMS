"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Footer/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  // const [activeItem, setActiveItem] = useState();
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Learnbay - About Us!"
        description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
        keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      />
      <About />
      <Footer/>
    </div>
  );
};

export default Page;
