"use client";
import React, { FC, useState } from "react";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {};

const DashboardHeader: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2 "
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-black dark:text-white text-2xl cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          3
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[50vh] bg-[#e9eaeb85] dark:bg-[#111c43]  shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="bg-[#00000013] dark:bg-[#2d3a4ea1] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">New Querry Recieved</p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit expedita
              pariatur maxime unde earum iste iure maiores laudantium!
            </p>
            <p className="py-2 px-2 text-black dark:text-white text-[14px]">
              18 Hrs ago
            </p>
          </div>

          <div className="bg-[#00000013] dark:bg-[#2d3a4ea1] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">New Querry Recieved</p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit expedita
              pariatur maxime unde earum iste iure maiores laudantium!!
            </p>
            <p className="py-2 px-2 text-black dark:text-white text-[14px]">
              3 Days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
