import React, { FC } from "react";
import Courseplayer from "@/app/utils/Courseplayer";
import Ratings from "@/app/utils/RatingStars";
import { styles } from "@/app/styles/style";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

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
  const discountPercentage =
    (courseData?.estimatedPrice -
      courseData?.price / courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const handleBack = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCreateCourse();
  };

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5 mb-5">
      <div className="full relative">
        <div className="w-full mt-10">
          <Courseplayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>

        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "flex" : "₹" + courseData?.price}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            ₹ {courseData?.estimatedPrice}
          </h5>
          <h4 className="pl-5 text-[22px] pt-4 ">
            {discountPercentagePrice}% Off
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now ₹ {courseData?.price}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount Coupon Code"
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} my-3 ml-4 font-Poppins cursor-pointer !w-[120px]`}
          >
            Apply
          </div>
        </div>

        <p className="pb-1  dark:text-white text-black">
          📖 Source Code Included
        </p>
        <p className="pb-1  dark:text-white text-black">
          🕐 Full Lifetime Access
        </p>
        <p className="pb-1  dark:text-white text-black">
          🔖 Certification Of Completion
        </p>
        <p className="pb-3 800px:pb-1  dark:text-white text-black">
          💁 Premium Support
        </p>
      </div>

      <div className="w-full ">
        <div className="w-full 800px:pr-5">
          <h1 className="font-Poppins font-[600] text-[25px]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3  dark:text-white text-black">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
            What you will learn from this course?
          </h1>
        </div>
        {courseData &&
          courseData?.benifits &&
          courseData?.benifits?.map((item: any, index: number) => (
            <>
              <div className="w-full py-2 flex 800px:items-center" key={index}>
                <div className="w-[15px] mr-1  dark:text-white text-black">
                  <IoCheckmarkDoneCircleOutline size={20} />
                </div>
                <p className="pl-2  dark:text-white text-black">{item.title}</p>
              </div>
            </>
          ))}
        <br />
        <br />

        <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <>
            <div className="w-full py-2 flex 800px:items-center" key={index}>
              <div className="w-[15px] mr-1  dark:text-white text-black">
                <IoCheckmarkDoneCircleOutline size={20} />
              </div>
              <p className="pl-2  dark:text-white text-black">{item.title}</p>
            </div>
          </>
        ))}
        <br />
        <br />
        {/* Course description */}
        <div className="w-full">
          <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  dark:text-white text-black">
            {courseData?.description || "Course Details===>"}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between mb-15">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#a33737] text-center text-[#ffff] rounded mt-8 cursor-pointer"
          onClick={() => handleBack()}
        >
          Back
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#ffff] rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
