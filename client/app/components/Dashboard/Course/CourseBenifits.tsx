import { styles } from "@/app/styles/style";
import { AddCircle } from "@mui/icons-material";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benifits: { title: string }[];
  setBenifits: (benifits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseBenifits: FC<Props> = ({
  benifits,
  setBenifits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {
    const updatedBenifits = [...benifits];
    updatedBenifits[index] = { title: value };
    setBenifits(updatedBenifits);
  };
  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = { title: value };
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddBenifits = () => {
    setBenifits([...benifits, { title: " " }]);
  };
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: " " }]);
  };

  const handleBack = () => {
    setActive(active - 1);
  };
  const handleNext = () => {
    if (
      benifits[benifits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for the NEXT step");
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-24 block">
      <div>
        <label htmlFor="" className={`${styles.label} text-[20px]`}>
          What are the benifits for the students in this course?
        </label>
        <br />
        {benifits.map((benifit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benifits"
            required
            value={benifit.title}
            className={`${styles.input} my-2`}
            onChange={(e: any) => handleBenifitChange(index, e.target.value)}
            placeholder="Add some  benifits of this course here!"
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenifits}
          className="dark:text-white text-black"
        />
      </div>

      <div>
        <label htmlFor="" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisites"
            required
            value={prerequisite.title}
            className={`${styles.input} my-2`}
            onChange={(e: any) =>
              handlePrerequisiteChange(index, e.target.value)
            }
            placeholder="Add some prereqiistes for this course"
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
          className="dark:text-white text-black"
        />
      </div>

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
    </div>
  );
};

export default CourseBenifits;
