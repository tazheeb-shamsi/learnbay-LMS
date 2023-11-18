"use client";

import React, { FC, useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import EnrolledCourses from "./EnrolledCourses";

import { useGetAllUsersCourseQuery } from "@/redux/features/courses/coursesAPi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState();

  const { data, isLoading } = useGetAllUsersCourseQuery(undefined, {});

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filterCourses = user.courses
        .map((purchasedCourse: any) =>
          data.course.find((course: any) => course._id === purchasedCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filterCourses);
    }
  }, [data]);

  return (
    <>
      <div className="w-[85%] flex mx-auto">
        <div
          className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-[#ffffffff] dark:border-[#ffffff1d] border-[#ffffff18] rounded-[5px] dark:shadow-sm shadow-md mt-[80px] mb-[80px] sticky ${
            scroll ? "top-[120px]" : "top-[30px"
          } left-[30px]`}
        >
          <SideBar
            user={user}
            avatar={avatar}
            active={active}
            setActive={setActive}
            logoutHandler={logoutHandler}
          />
        </div>
        {active === 1 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}
        {active === 2 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <ChangePassword user={user} />
          </div>
        )}
        {active === 3 && (
          <div className="w-full h-full bg-transparent mt-[80px]">
            <EnrolledCourses courses={courses} />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
