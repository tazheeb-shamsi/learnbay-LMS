import React from "react";
import CourseCard from "../Course/CourseCard";

type Props = { courses: any };

const EnrolledCourses = ({ courses }: Props) => {
  return (
    <div>
      <div className="w-full ml-10 pl-7 !px-2 !800px:px-10 800px:pl-8">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <>
                <CourseCard item={item} key={index} />
              </>
            ))}
        </div>

        {courses && courses.length === 0 && (
          <h1 className="text-center text-20px font-Poppins mt-10">
            You don&apos;t have purchased any course yet!
          </h1>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
