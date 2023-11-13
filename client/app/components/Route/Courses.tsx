import { useGetAllUsersCourseQuery } from "@/redux/features/courses/coursesAPi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllUsersCourseQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.course);
  }, [data]);


  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto mt-[6rem]`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black  800px:!leading-[60px] font-[700] tracking-tight">
          Expand Your Career{""}
          <span className="text_animation ml-2">Opportunity</span>
          <br />
          Opportunities With Our Courses
        </h1>
        <br />
        <br />

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
