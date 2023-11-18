import Link from "next/link";
import React, { FC } from "react";

export const navItemData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Courses",
    url: "/courses",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Policy",
    url: "/policy",
  },
  // {
  //   title: "Contact",
  //   url: "/contact",
  // },
  {
    title: "Faq",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        <div className="w-full text-center py-6">
          {navItemData &&
            navItemData.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`${item.url}`}
                  passHref
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson] font-bold"
                      : "dark:text-white text-black"
                  }
                  text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.title}
                </Link>
              );
            })}
        </div>
      </div>

      {isMobile && (
        <div className=" 800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemData &&
              navItemData.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.url}
                    passHref
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson] font-bold"
                        : "dark:text-white text-black"
                    }
                    block text-[18px] px-6 py-5 font-Poppins font-[400]`}
                  >
                    {item.title}
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
