import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN Stack LMS Platform with NEXT ^13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write Course description here!"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              id="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="₹ 15999"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Estimated Price (Optional)
            </label>
            <input
              type="number"
              id="estimated-price"
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="₹ 19999"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type="text"
            id="tags"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="e.g: Development, Mobile Development, UI/UX, Designing etc."
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              id="courseLevel"
              required
              value={courseInfo.courseLevel}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, courseLevel: e.target.value })
              }
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Demo Link (Optional)
            </label>
            <input
              type="text"
              id="demo-url"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="e.g: https://tazheeb.com"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumnail ? (
              <img
                src={courseInfo.thumnail}
                alt="course-thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className={`text-black dark:text-white`}>
                Drag and drop your thumbnail here or click to browse thumbnail
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>

      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseInformation;
