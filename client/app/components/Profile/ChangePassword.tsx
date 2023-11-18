import { styles } from "@/app/styles/style";
import { useChangePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  user: any;
};

const ChangePassword: FC<Props> = (props: Props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isSuccess, error }] = useChangePasswordMutation();

  const changePasswordHandler = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await changePassword({
        oldPassword,
        newPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-8">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          className="flex flex-col items-center"
          aria-required
          onSubmit={changePasswordHandler}
        >
          <div className="relative w-[100%] 800px:w-[60%] mt-5 ">
            <label htmlFor="oldPassword" className={`${styles.label}`}>
              Enter Old Password
            </label>
            <input
              name="oldPassword"
              id="oldPassword"
              type={!showOldPassword ? "password" : "text"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={oldPassword}
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {!showOldPassword ? (
              <AiOutlineEye
                className="absolute bottom-3 right-12 z-1 cursor-pointer  dark:text-white "
                size={20}
                onClick={() => setShowOldPassword(true)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-12 z-1 cursor-pointer dark:text-white"
                size={20}
                onClick={() => setShowOldPassword(false)}
              />
            )}
          </div>
          <div className="relative w-[100%] 800px:w-[60%] mt-5">
            <label className={`${styles.label}`}>Enter New Password</label>
            <input
              id="newPassword"
              type={!showNewPassword ? "password" : "text"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {!showNewPassword ? (
              <AiOutlineEye
                className="absolute bottom-3 right-12 z-1 cursor-pointer  dark:text-white "
                size={20}
                onClick={() => setShowNewPassword(true)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-12 z-1 cursor-pointer dark:text-white"
                size={20}
                onClick={() => setShowNewPassword(false)}
              />
            )}
          </div>
          <div className=" w-[100%] 800px:w-[60%] relative mt-5 ">
            <label className={`${styles.label}`}>Confirm Password</label>
            <input
              id="confirmPassword"
              type={!showConfirmPassword ? "password" : "text"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!showConfirmPassword ? (
              <AiOutlineEye
                className="absolute bottom-3 right-12 z-1 cursor-pointer  dark:text-white "
                size={20}
                onClick={() => setShowConfirmPassword(true)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-12 z-1 cursor-pointer dark:text-white"
                size={20}
                onClick={() => setShowConfirmPassword(false)}
              />
            )}
          </div>
          <input
            type="submit"
            className={`w-[35%] h-[40px] border border-[#37a39a] text-center  text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer items-center`}
            value="Update"
            required
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
