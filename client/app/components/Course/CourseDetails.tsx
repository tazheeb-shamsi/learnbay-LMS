import RatingStars from "@/app/utils/RatingStars";
import React, { FC, useEffect, useState } from "react";
import { IoCheckmarkDoneCircleOutline, IoCloseOutline } from "react-icons/io5";
import Courseplayer from "@/app/utils/Courseplayer";
import { formatDate } from "@/app/utils/formatDate";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import defaultAvatar from "../../../public/assets/avatar.png";

import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  course: any;
  clientSecret: string;
  stripePromise: any;
  setOpen: any;
  setRoute: any;
};

const CourseDetails: FC<Props> = ({
  course,
  clientSecret,
  stripePromise,
  setOpen: openAuthModal,
  setRoute,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>();

  const { data: userData } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);
  const discountPercentage =
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user.courses.find((item: any) => item._id === course._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5 mb-5 ">
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
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneCircleOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item?.title}
                  </p>
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
                  Ratings • {course?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(course?.reviews && [...course.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div>
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : defaultAvatar
                            }
                            width={50}
                            height={50}
                            alt="avatar"
                            style={{ objectFit: "contain" }}
                            className="rounded-full w-[30px] h-[30px] object-contain"
                          />
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
                          {item.review}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {formatDate(item.createdAt)} •
                        </small>
                      </div>

                      <div className="pl-2 flex 800px:hidden items:center">
                        <h5 className="text-18px pr-2 dark:text-white text-black">
                          {item.user.name}
                        </h5>
                        <RatingStars rating={item.rating} />
                      </div>
                    </div>

                    {item.reviewReplies.map((i: any, index: number) => (
                      <>
                        <div
                          className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                          key={index}
                        >
                          <div>
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : defaultAvatar
                              }
                              width={50}
                              height={50}
                              alt="avatar"
                              style={{ objectFit: "contain" }}
                              className="rounded-full w-[30px] h-[30px] object-contain"
                            />
                          </div>
                          <div className="pl-3 text-black dark:text-white">
                            <div className="flex items-center">
                              <h5 className="text-[20px] mr-1">
                                {i?.user.name}
                              </h5>
                              {i.user.role === "admin" && (
                                <VscVerifiedFilled
                                  fill="#4c68d7 "
                                  className="mb-2"
                                />
                              )}
                            </div>
                            <p>{i?.reviewReply}</p>
                            <small className="text-[#000000b8] dark:text-[#ffffff83]">
                              {formatDate(i?.createdAt)} {"•"}
                            </small>
                          </div>
                        </div>
                      </>
                    ))}
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
                  <div
                    className={`${styles.button} !w-auto my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now ₹ {course.price}
                  </div>
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
      <>
        {open && (
          <div className="w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center bg-[#00000036]">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm
                      setOpen={setOpen}
                      course={course}
                      user={user}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
