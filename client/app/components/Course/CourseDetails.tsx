import RatingStars from "@/app/utils/RatingStars";
import React, { FC } from "react";
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import Courseplayer from "@/app/utils/Courseplayer";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import CourseContentList from "../Course/CourseContentList";

type Props = {
  course: any;
};

const CourseDetails: FC<Props> = ({ course }) => {
  const { user } = useSelector((state: any) => state.auth);

  const discountPercentage =
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user.courses.find((item: any) => item._id === course._id);

  const handleOrder = (w: any) => {
    console.log("Order success");
  };
  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5 mb-5">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className="font-Poppins text-[25px] font-[600] text-black dark:text-white">
            {course?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <RatingStars rating={course?.ratings} />
              <h5 className="text-black dark:text-white">
                {course?.reviews?.length} Reviews
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {course?.purchased} Students
            </h5>
          </div>

          <br />
          <h1 className="font-Poppins text-[25px] font-[600] text-black dark:text-white">
            What You&apos;ll Learn From This Course?
          </h1>

          {course &&
            course.benifits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneCircleOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item?.title}</p>
              </div>
            ))}

          <br />
          <br />
          <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
            What are the prerequisites for starting this course?
          </h1>
          {course &&
            course?.prerequisites?.map((item: any, index: number) => (
              <>
                <div
                  className="w-full py-2 flex 800px:items-center"
                  key={index}
                >
                  <div className="w-[15px] mr-1  dark:text-white text-black">
                    <IoCheckmarkDoneCircleOutline
                      size={20}
                      className="dark:text-white text-black"
                    />
                  </div>
                  <p className="pl-2  dark:text-white text-black">
                    {item?.title}
                  </p>
                </div>
              </>
            ))}
          <br />
          <br />
          <div>
            <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
              Course Overview
            </h1>

            <CourseContentList courseData={course?.courseData} />
          </div>
          <br />
          <br />
          <div className="w-full">
            <h1 className="font-Poppins font-[600] text-[25px]  dark:text-white text-black">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  dark:text-white text-black">
              {course?.description}
            </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className="800px:flex items-center">
              <RatingStars rating={course?.ratings} />
              <div className="mb-2 800px:mb-[unset]" />

              <h5 className="text-25px font-Poppins dark:text-white text-black">
                {Number.isInteger(course?.ratings)
                  ? course.ratings.toFixed(1)
                  : course.ratings.toFixed(2)}{" "}
                Course Ratings • {course?.reviews?.length} Reviews
              </h5>
            </div>
            <br />
            {(course?.reviews && [...course.reviews].reverse()).map(
              (item: any, index: number) => (
                <div className="w-full pb-4" key={index}>
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <div className="w-[50px] h-[50px] bg-slte-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-18px dark:text-white text-black">
                          {item.user.name.slice(0, 2)}
                        </h1>
                      </div>
                    </div>

                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-18px pr-2 dark:text-white text-black">
                          {item.user.name}
                        </h5>
                        <RatingStars rating={item.rating} />
                      </div>

                      <p className="dark:text-white text-black">
                        {item.comment}
                      </p>
                      <small className="text-[#000000d1] dark:text-[#ffffff83]">
                        {formatDate(item.ceatedAt)}
                      </small>
                    </div>

                    <div className="pl-2 flex 800px:hidden items:center">
                      <h5 className="text-18px pr-2 dark:text-white text-black">
                        {item.user.name}
                      </h5>
                      <RatingStars rating={item.rating} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="w-full 800px:w-[35%] relative">
          <div className="sticky top-[100px] left-0 z-50 w-[full]">
            <Courseplayer videoUrl={course?.demoUrl} title={course?.title} />
            <div className="flex items-center">
              <h1 className="pt-5 text-[25px] dark:text-white text-black">
                {course.price === 0 ? "FREE" : "₹ " + course.price}
              </h1>
              <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 dark:text-white text-black">
                ₹ {course.estimatedPrice}
              </h5>
              <h4 className="pl-5 pt-4 text-[22px] dark:text-white text-black">
                {discountPercentagePrice} % Off
              </h4>
            </div>

            <div className="flex items-center">
              {isPurchased ? (
                <Link
                  href={`/course-access/${course._id}`}
                  className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                >
                  Enter to Course
                </Link>
              ) : (
                <Link
                  href={`/course-access/${course._id}`}
                  className={`${styles.button} !w-auto my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                >
                  Buy Now ₹ {course.price}
                </Link>
              )}
            </div>
            <br />
            <p className="p-1 dark:text-white text-black flex ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className=" text-[#088F8F] mr-3"
              />
              Source Code Included
            </p>
            <p className="p-1 dark:text-white text-black flex ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className=" text-[#088F8F] mr-3"
              />
              Full Lifetime Acces
            </p>
            <p className="p-1 dark:text-white text-black flex ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className=" text-[#088F8F] mr-3"
              />
              Certificate Of Completion
            </p>
            <p className="p-1 800px:pb-1 dark:text-white text-black flex ">
              <IoCheckmarkDoneCircleOutline
                size={20}
                className=" text-[#088F8F] mr-3"
              />
              Premium Support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
