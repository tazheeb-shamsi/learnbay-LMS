"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import CourseContent from "../../components/Course/CourseContent";
import React, { useEffect } from "react";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading:userLoading, data, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (course: any) => course._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data]);

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent courseId={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default page;
