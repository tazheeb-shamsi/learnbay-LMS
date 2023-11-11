import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quidem. ",
  },
  {
    name: "John Davidson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    profession: "Senior Web Developer | India",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quidem. ",
  },
  {
    name: "Miller Davidson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quidem. ",
  },
  {
    name: "Phillip Davidson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quidem. ",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto mt-20">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/reviews.png")}
            height={600}
            width={600}
            alt="Business"
            className="rounded"
          />
        </div>

        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are Our{" "}
            <span className="text_animation ml-2"> Strength</span>
            <br />
            See What They Say About Us..
          </h3>
          <br />
          <p className={styles.label}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            sequi officia velit nesciunt quasi et vero, deserunt fuga eius
            cumque culpa deleniti earum eveniet similique ipsum quo? Accusamus,
            dolores repudiandae.
          </p>
        </div>

        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg-grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*nth-child(3)]:!mt-[-60px] md:[&>*nth-child(6)]:!mt-[-40px] mt-20">
        {reviews &&
          reviews.map((review, index) => (
            <ReviewCard review={review} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
