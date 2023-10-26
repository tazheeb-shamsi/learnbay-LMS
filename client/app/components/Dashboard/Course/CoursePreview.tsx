import React, { FC } from "react";
import Courseplayer from "@/app/utils/Courseplayer";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCreateCourse: any;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCreateCourse,
}) => {
  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5 mb-5">
      <div className="full relative">
        <div className="w-full mt-10">
          <Courseplayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
