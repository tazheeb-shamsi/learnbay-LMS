import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import defaultAvatar from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: user.name,
        // email: user.email,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
            }
            alt=""
            width={120}
            height={120}
            className="cursor-pointer rounded-full w-[120px] h-[120px] border-[5px] border-[#37a39a]"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" fill="#fff" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2  text-black dark:text-[#fff]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2  text-black dark:text-[#fff]">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                required
                value={user?.email}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              />
              <input
                type="submit"
                required
                value="Update Profile"
                className={`w-[95%]  h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer `}
              />
            </div>
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
