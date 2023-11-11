import RatingStars from "@/app/utils/RatingStars";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  review: any;
};

const ReviewCard: FC<Props> = ({ review }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bh-opacity-[0.20] border border-[#00000208] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <Image
          alt="avatar"
          src={review.avatar}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />

        <div className="800px:flex justify—between w—full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text—white">
              {review.name}
            </h5>
            <h6 className="text-[16px] text-[#000] dark:text—[#ffffffab]">
              {review.profession}
            </h6>
          </div>
          <RatingStars rating={review.ratings} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text—white">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
