import Image from "next/image";
import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="text-black dark:text-white !mb-20">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>Contact Us!</h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto mt-10">
        <div className="flex flex-col lg:flex-row p-4">
          <div className="lg:w-1/2 order-1 lg:order-1">
            <Image
              src={require("../../public/assets/contact-us.svg")}
              alt="Contact Image"
              width={450}
              height={450}
              style={{ objectFit: "cover" }}
              className="object-cover rounded-lg"
            />
          </div>

          <div className="lg:w-1/2 order-2 lg:order-2 p-4">
            <form>
              <div className="my-3">
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                />
              </div>

              <div className="my-3">
                <label className={styles.label}>Email</label>
                <input
                  type="text"
                  placeholder="Enter your email..."
                  className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                />
              </div>

              <div className="my-3">
                <label className={styles.label}>Phone</label>
                <input
                  type="text"
                  placeholder="Enter your phone..."
                  className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                />
              </div>

              <div className="my-3">
                <label className={styles.label}>Message</label>
                <textarea
                  name=""
                  id=""
                  cols={40}
                  rows={5}
                  placeholder="Write your question here..."
                  className="outline-none bg-transparent border dark:border-[#ffffff57] border-[#68686842] w-full p-2 rounded 800px:text-[18px] font-Poppins"
                />
              </div>

              <button
                type="submit"
                className={`${styles.button} bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none `}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
