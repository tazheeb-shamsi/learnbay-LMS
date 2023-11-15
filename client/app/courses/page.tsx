"use client";

import { useGetAllUsersCourseQuery } from "@/redux/features/courses/coursesAPi";
import { useGetHeroSectionDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const { data, isLoading } = useGetAllUsersCourseQuery(undefined, {});
  const { data: categoriesData } = useGetHeroSectionDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.course);
    }
    if (category !== "All") {
      setCourses(
        data?.course.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.course.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;
  console.log("categoriesData", categories);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />

          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[90vh]">
            <Heading
              title="Learnbay - Courses"
              description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
              keywords="Programming, MERN, Full Stack Developer, Software Engineer, Web Development, MongoDb, Expres.js, React.js, Node.js, Javascript"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>

              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-50vh flex items-center mt-40`}
              >
                {search
                  ? "No Courses Found"
                  : "No Courses Found In This Category, Please Try Another Category!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
