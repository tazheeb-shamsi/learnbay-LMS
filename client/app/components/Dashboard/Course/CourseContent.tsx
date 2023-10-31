import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContent: any;
  setCourseContent: (courseContent: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContent,
  setCourseContent,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContent?.length).fill(false)
    );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const removeLink = [...courseContent];
    removeLink[index].links.splice(linkIndex, 1);
    setCourseContent(removeLink);
  };

  const handleAddLink = (index: number) => {
    const addLink = [...courseContent];
    addLink[index].links.push({ title: "", url: "" });
    setCourseContent(addLink);
  };

  const addNewContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all of the fields first");
    } else {
      let newVideoSection = "";
      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;

        //using last video section if available, else just use the user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        title: "",
        description: "",
        videoUrl: "",
        links: [{ title: "", url: "" }],
        videoSection: newVideoSection,
      };
      setCourseContent([...courseContent, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all of the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        title: "",
        description: "",
        videoUrl: "",
        links: [{ title: "", url: "" }],
        videoSection: `Add a title to this section ${activeSection}`,
      };
      setCourseContent([...courseContent, newContent]);
    }
  };

  const handleBack = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      toast.error(`Fields can't be empty, \n Please fill all of the fields!`);
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContent?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContent[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        placeholder="Add Section Title"
                        className={`text-[20px] ${
                          item.videoSection === "Add a title to this section"
                            ? "w-auto"
                            : "w-min"
                        } font-Poppins cursor-pointer  dark:text-white text-black p-1 border`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContent(updatedData);
                        }}
                      />
                      <BiSolidPencil
                        className="cursor-pointer dark:text-white text-black ml-3"
                        size={20}
                      />
                    </div>
                    <br />
                  </>
                )}

                <div className="w-full items-center justify-between flex my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Arrow button for collepsed video */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-black text-[20px] r-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContent];
                          updatedData.splice(index, 1);
                          setCourseContent(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      onClick={() => handleCollapseToggle(index)}
                      className=" dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Add video Title"
                        className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].title = e.target.value;
                          setCourseContent(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="Add video link"
                        className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContent(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Enter video description"
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContent];
                          updatedData[index].description = e.target.value;
                          setCourseContent(updatedData);
                        }}
                      />
                      <br />
                    </div>

                    {item?.links &&
                      item.links.map((link: any, linkIndex: number) => (
                        <>
                          <div className="mb-3 block">
                            <div className="w-full flex items-center justify-between">
                              <label className={styles.label}>
                                Link {linkIndex + 1}
                              </label>
                              <AiOutlineDelete
                                className={`dark:text-white text-black text-[20px] r-2 ${
                                  linkIndex === 0
                                    ? "cursor-no-drop"
                                    : "cursor-pointer"
                                }`}
                                onClick={() =>
                                  linkIndex === 0
                                    ? null
                                    : handleRemoveLink(index, linkIndex)
                                }
                              />
                            </div>

                            <input
                              type="text"
                              placeholder="Source code .. (Link Title)"
                              className={` ${styles.input} font-Poppins cursor-pointer  dark:text-white text-black`}
                              name="title"
                              value={link.title}
                              onChange={(e) => {
                                const updatedData = [...courseContent];
                                updatedData[index].links[linkIndex].title =
                                  e.target.value;
                                setCourseContent(updatedData);
                              }}
                            />
                            <input
                              type="text"
                              name="url"
                              placeholder="Source code url.. (Link URL)"
                              className={` ${styles.input} font-Poppins cursor-pointer dark:text-white text-black`}
                              value={link.url}
                              onChange={(e) => {
                                const updatedData = [...courseContent];
                                updatedData[index].links[linkIndex].url =
                                  e.target.value;
                                setCourseContent(updatedData);
                              }}
                            />
                          </div>
                        </>
                      ))}

                    <br />

                    {/* Add links button */}
                    <div className="inline-block mb4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}

                <br />
                {/* Add new Content  */}
                {index === courseContent.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-18px dark:text-white text-black cursor-pointer"
                      onClick={() => addNewContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add new content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new section
        </div>
      </form>

      <br />
      <div className="w-full flex items-center justify-between mb-15">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#a33737] text-center text-[#ffff] rounded mt-8 cursor-pointer"
          onClick={() => handleBack()}
        >
          Back
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#ffff] rounded mt-8 cursor-pointer"
          onClick={() => handleNext()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
