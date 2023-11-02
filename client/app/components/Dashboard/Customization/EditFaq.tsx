import { styles } from "@/app/styles/style";
import { useGetHeroSectionDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlay, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading } = useGetHeroSectionDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [question, setQuestion] = useState<any[]>([]);
  const [answer, setAnswer] = useState("");

  console.log("GetHeroSectionDataQuery", data);

  useEffect(() => {
    if (data) {
      setQuestion(data.layout.questions);
    }
  }, [data]);

 console.log("GetHeroSectionDataQuery", question);
  return (
    <div>Hi</div>
    // <div className="w-[90%] 800px:w-[80%] mx-auto mt-[120px]">
    //   <div className="mt-12">
    //     <dl className="space-y-8">
    //       {question.map((q: any) => (
    //         <div
    //           className={`${
    //             q.id !== question[0]?._id && "border-t"
    //           }border - gray - 200 pt-6`}
    //           key={q._id}
    //         >
    //           <dt className="text-lg">
    //             <button
    //               className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
    //               onClick={() => toggleQuestion(q._id)}
    //             >
    //               <input
    //                 type="text"
    //                 value={q.question}
    //                 onChange={(e: any) =>
    //                   handleQuestionChange(q._id, e.target.value)
    //                 }
    //                 placeholder="Add your question..."
    //                 className={`${styles.input} border-none`}
    //               />

    //               <span className="ml-6 flex-shink-0">
    //                 {q.active ? (
    //                   <HiMinus className="h-6 w-6" />
    //                 ) : (
    //                   <HiPlus className="h-6 w-6" />
    //                 )}
    //               </span>
    //             </button>
    //           </dt>

    //           {q.active && (
    //             <dd className="mt-2 pr-12">
    //               <input
    //                 type="text"
    //                 className={`${styles.input} border-none`}
    //                 value={q.answer}
    //                 onChange={(e: any) =>
    //                   handleAnswerChange(q._id, e.target.value)
    //                 }
    //                 placeholder="Add your answer..."
    //               />
    //               <span className="ml-6 flex-shink-0">
    //                 <AiOutlineDelete
    //                   onClick={() =>
    //                     setQuestion((prevQuestion) =>
    //                       prevQuestion.filter((item) => item._id !== q.id)
    //                     )
    //                   }
    //                   className="dark:text-white text-black cursor-pointer text-[18px]"
    //                 />
    //               </span>
    //             </dd>
    //           )}
    //         </div>
    //       ))}
    //     </dl>

    //     <br />
    //     <br />
    //     <IoMdAddCircleOutline
    //       onClick={addNewFaqHandler}
    //       className="dark:text-white text-black cursor-pointer text-[18px]"
    //     />
    //   </div>

    //   <div
    //     className={`${
    //       styles.button
    //     } !w-[100px] !min-h-[40px] h-[40px] dark:text-white text-black bg-[#cccccc34]
    //     ${
    //       areQuestionsUnchabged(data.layout.faq, questions) ||
    //       isAnyQuestionEmpty(questions)
    //         ? "cursor-not-allowed"
    //         : "!cursor-pointer !bg-[#42d383]"
    //     }
    //     `}
    //     onClick={
    //       areQuestionsUnchabged(data.layout.faq, questions) ||
    //       isAnyQuestionEmpty(questions)
    //         ? () => null
    //         : handleEdit
    //     }
    //   >
    //     Save
    //   </div>
    // </div>
  );
};

export default EditFaq;
