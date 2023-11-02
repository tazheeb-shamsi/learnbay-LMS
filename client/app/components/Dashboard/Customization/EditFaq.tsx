import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroSectionDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroSectionDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  console.log(data);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      refetch()
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.message);
      }
    }
  }, [data, isSuccess, error]);

  console.log("questions ==>", questions);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((item) =>
        item._id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((item) =>
        item._id === id ? { ...item, question: value } : item
      )
    );
  };

  const addNewFaqHandler = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestion) =>
      prevQuestion.map((item) =>
        item._id === id ? { ...item, answer: value } : item
      )
    );
  };

  // function to check is there change in FAQ array or not.
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return (
      questions && questions.some((q) => q.question === "" || q.answer === "")
    );
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] mx-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8 ">
              {questions &&
                questions.map((q: any) => (
                  <div
                    className={`${
                      q.id !== questions[0]?._id && "border-t"
                    } border-gray-200 pt-6`}
                    key={q._id}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        <input
                          type="text"
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder="Add your question..."
                          className={`${styles.input} border-none`}
                        />

                        <span className="ml-6 flex-shink-0">
                          {q.active ? (
                            <MdOutlineKeyboardArrowUp className="h-6 w-6" />
                          ) : (
                            <MdOutlineKeyboardArrowDown className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>

                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          type="text"
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder="Add your answer..."
                        />
                        <span className="ml-6 flex-shink-0 ">
                          <AiOutlineDelete
                            onClick={() =>
                              setQuestions((prevQuestion) =>
                                prevQuestion.filter((item) => item._id !== q.id)
                              )
                            }
                            className="cursor-pointer ml-2 text-[18px] !text-red-500"
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
            </dl>

            <br />
            <br />
            <IoMdAddCircleOutline
              onClick={addNewFaqHandler}
              className="dark:text-white text-black cursor-pointer text-[25px]"
            />
          </div>

          <div
            className={`${
              styles.button
            }  !w-[100px] !min-h-[40px] !h-[40px] mt-10 dark:text-white text-black bg-[#cccccc34]
        ${
          areQuestionsUnchanged(data?.layout.faq, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed"
            : "!cursor-pointer !bg-[#42d383]"
        }
        !rounded absolute bottom-12 right-12 items-center`}
            onClick={
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
