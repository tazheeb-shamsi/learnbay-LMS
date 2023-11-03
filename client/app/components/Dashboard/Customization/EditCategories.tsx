import {
  useEditLayoutMutation,
  useGetHeroSectionDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroSectionDataQuery(
    "Categories",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [editCategories, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout.categories);
    }
    if (isSuccess) {
      toast.success("Categories updated successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleCategoryChange = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const addNewCategoryHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error(" Category's Title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  // function to check is there change in FAQ array or not.
  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories && categories.some((q) => q.title === "");
  };

  const saveCategoryHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryEmpty(categories)
    ) {
      await editCategories({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}> All Categories</h1>

          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <>
                  <div className="p-3">
                    <div className="flex items-center w-full justify-center">
                      <input
                        value={item.title}
                        className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                        onChange={(e: any) =>
                          handleCategoryChange(item._id, e.target.value)
                        }
                        placeholder="Add a new category"
                      />

                      <AiOutlineDelete
                        onClick={() =>
                          setCategories((prevCategory) =>
                            prevCategory.filter((i: any) => i._id !== item._id)
                          )
                        }
                        className="cursor-pointer text-[18px] !text-red-500"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              onClick={addNewCategoryHandler}
              className="dark:text-white text-black cursor-pointer text-[25px]"
            />
          </div>

          <div
            className={`${
              styles.button
            }  !w-[100px] !min-h-[40px] !h-[40px] mt-10 dark:text-white text-black bg-[#cccccc34]
        ${
          areCategoriesUnchanged(data?.layout.categories, categories) ||
          isAnyCategoryEmpty(categories)
            ? "!cursor-not-allowed"
            : "!cursor-pointer !bg-[#42d383]"
        }
        !rounded absolute bottom-12 right-12 items-center`}
            onClick={
              areCategoriesUnchanged(data?.layout.categories, categories) ||
              isAnyCategoryEmpty(categories)
                ? () => null
                : saveCategoryHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
