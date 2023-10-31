"use client";

import React, { FC, useEffect, useState } from "react";
import CourseInfo from "./CourseInformation";
import CourseBenifits from "./CourseBenifits";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useGetAllCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/coursesAPi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation({});
  const { data, refetch } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const course = data && data.courses.find((course: any) => course._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
      redirect("/dashboard/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (course) {
      setCourseInfo({
        name: course.name,
        description: course.description,
        price: course.price,
        estimatedPrice: course?.estimatedPrice,
        tags: course.tags,
        courseLevel: course.courseLevel,
        demoUrl: course.demoUrl,
        thumbnail: course?.thumbnail,
      });
      setBenifits(course.benifits);
      setPrerequisites(course.prerequisites);
      setCourseContent(course.courseData);
    }
  }, [course]);

  const [courseData, setCourseData] = useState({});
  const [benifits, setBenifits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    courseLevel: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [courseContent, setCourseContent] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Add a title to this section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const handleSubmit = () => {
    // Formatting benifits
    const formattedBenifits = benifits.map((benifit) => ({
      title: benifit.title,
    }));

    // Formatting prerequisites
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Formatting course contents
    const formattedCourseContent = courseContent.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    // Formatting course info
    const newCourseData = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      courseLevel: courseInfo.courseLevel,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContent.length,
      benifits: formattedBenifits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContent,
    };

    setCourseData(newCourseData);
  };

  const handleCreateCourse = async (e: any) => {
    const data = courseData;
    await updateCourse({ id: course._id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseBenifits
            benifits={benifits}
            setBenifits={setBenifits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContent={courseContent}
            setCourseContent={setCourseContent}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCreateCourse={handleCreateCourse}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
