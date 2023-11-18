import { styles } from "@/app/styles/style";
import { useGetHeroSectionDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroSectionDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout.faq);
    }
  }, [data]);

  const toggledQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto mt-16">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequently Asked <span className="text_animation">Questions</span>
        </h1>
        <div className="mt-16 mb-20">
          <div className="space-y-8">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`${
                  q._id != questions[0]?._id && "border-t"
                }border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggledQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <MdOutlineKeyboardArrowUp className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <MdOutlineKeyboardArrowDown className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppins text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
