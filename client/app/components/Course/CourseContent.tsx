import { useGetCourseContentQuery } from "@/redux/features/courses/coursesAPi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  courseId: string;
  user: any;
};

const CourseContent: FC<Props> = ({ courseId, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(courseId, { refetchOnMountOrArgChange: true });

  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              route={route}
            />
            <div className="w-full grid 800px:grid-cols-10 ">
              <Heading
                title={data[activeVideo]?.title}
                description="Leanbay is a platform specially for the Freshers and also for the Experienced Canditates to enhance there technical skill-sets."
                keywords={data[activeVideo]?.tags}
              />

              <div className="col-span-7">
                <CourseContentMedia
                  data={data}
                  courseId={courseId}
                  user={user}
                  activeVideo={activeVideo}
                  refetch={refetch}
                  setActiveVideo={setActiveVideo}
                />
              </div>
              <div className="hidden 800px:block 800px:col-span-3 ">
                <CourseContentList
                  courseData={data}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContent;
