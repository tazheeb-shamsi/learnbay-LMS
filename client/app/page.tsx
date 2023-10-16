"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title="Learnbay"
        description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
        keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
