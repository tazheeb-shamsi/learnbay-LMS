"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar1.png";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Logged-In Successfully");
    }
  }, [data, user]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div
          className={`${
            active
              ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffffff] shadow-xl transition duration-500"
              : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shoadow"
          }`}
        >
          <div className="w-[95%] 800px:w-[92%] m-auto h-full py-2">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <div>
                <Link
                  href={"/"}
                  className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                >
                  Learnbay
                </Link>
              </div>
              <div className="flex items-center">
                <NavItems activeItem={activeItem} isMobile={false} />
                <ThemeSwitcher />

                {/* Only for mobile */}
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3
                    className="cursor-pointer dark:text-white text-black"
                    fill="white"
                    size={25}
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                <div className="ml-5">
                  {user ? (
                    <Link href={"/profile"}>
                      <Image
                        src={user.avatar ? user.avatar : avatar}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer dark:text-white text-black hidden 800px:block"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* sidebar for mobile */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] daek:bg-[unset] bg-[#0000024]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
                <br />
                <br />
                <hr />
                <p className="text-[16px] px-2 pl-5  dark:text-white text-black">
                  Copyright ©️ 2023 Leanbay
                </p>
              </div>
            </div>
          )}
        </div>
        {route === "Login" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Login}
              />
            )}
          </>
        )}
        {route === "Signup" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Signup}
              />
            )}
          </>
        )}
        {route === "Verification" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Verification}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
