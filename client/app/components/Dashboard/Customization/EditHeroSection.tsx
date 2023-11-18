import {
  useEditLayoutMutation,
  useGetHeroSectionDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Image from "next/image";

type Props = {};

const EditHeroSection: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroSectionDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, isLoading, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setImage(data?.layout?.banner?.image[0].url);
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
    }

    if (isSuccess) {
      refetch();
      toast.success("Hero Layout Successfully Updated");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdateHeroImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center mt-[120px]">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[500px] 1500px:w-[500px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vw] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[40%] flex 1000px-min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-[10]">
          <div className="relative flex items-center justify-end ml-20">
            <Image
              src={image}
              width={400}
              height={400}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />

            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdateHeroImage}
              className="hidden"
            />

            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer" />
            </label>
          </div>
        </div>

        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <textarea
            className="dark:text-white resize-none text-[#0000007c] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[60px] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] bg-transparent"
            rows={4}
            value={title}
            placeholder="Enter your title here"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px]  1500px:!w-[55%] 1100px:!w-[74%] bg-transparent mt-10"
            placeholder="Enter your sub title here"
            value={subTitle}
            rows={4}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <br />
          <br />
          <br />

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
           ${
             data?.layout?.banner?.title !== title ||
             data?.layout?.banner?.subTitle !== subTitle ||
             data?.layout?.banner?.image !== image
               ? "!cursor-pointer !bg-[#42d383]"
               : "!cursor-not-allowed"
           }
            !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHeroSection;
