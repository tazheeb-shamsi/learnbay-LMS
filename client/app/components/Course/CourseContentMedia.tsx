import { styles } from "@/app/styles/style";
import Courseplayer from "@/app/utils/Courseplayer";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSend,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../public/assets/avatar.png";
import { VscSend, VscVerifiedFilled } from "react-icons/vsc";
import toast from "react-hot-toast";
import {
  useAddAnswerToQuestionMutation,
  useAddNewQuestionMutation,
} from "@/redux/features/courses/coursesAPi";
import { formatDate } from "@/app/utils/formatDate";
import { BiMessage } from "react-icons/bi";

type Props = {
  data: any;
  user: any;
  refetch: any;
  courseId: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia: FC<Props> = ({
  data,
  courseId,
  user,
  refetch,
  activeVideo,
  setActiveVideo,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, isLoading: LoadingWhileCreatingNewQueston, error },
  ] = useAddNewQuestionMutation({});

  const [
    addAnswerToQuestion,
    {
      isSuccess: answerSuccess,
      isLoading: answerCreationLoading,
      error: anserCreationError,
    },
  ] = useAddAnswerToQuestionMutation({});

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = (e) => {
    if (question.length === 0) {
      toast.error("Please fill the question field");
    } else {
      addNewQuestion({
        question,
        courseId: courseId,
        contentId: data[activeVideo]._id,
      });
      toast.success("Your Question Adeed Successfully");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errMsg = error.data as any;
        toast.error(errMsg.message);
      }
    }
    if (anserCreationError) {
      if ("data" in anserCreationError) {
        const errMsg = anserCreationError.data as any;
        toast.error(errMsg.message);
      }
    }
  }, [isSuccess, answerSuccess, refetch, error, anserCreationError]);

  const handleReplySubmit = () => {
    addAnswerToQuestion({
      answer,
      courseId: courseId,
      questionId: questionId,
      contentId: data[activeVideo]._id,
    });
    toast.success("Your Answer Adeed Successfully");
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <Courseplayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3 ">
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] items-center text-black dark:text-white ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] items-center text-black dark:text-white ${
            activeVideo === 0 && "!cursor-pointer opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full py-4 px-5 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <h5
            className={`800px:text-[20px] px-5 text-black dark:text-white cursor-pointer ${
              activeBar === index && "!text-red-500"
            }`}
            key={index}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h5>
        ))}
      </div>
      <br />

      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="ml-5">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <>
              <div className="mb-5">
                <h2 className="800px:text-20px 800px:inline-block text-black dark:text-white ">
                  {item.title && item.title + " : "}
                </h2>
                <a
                  href={item.url}
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800:pl-2 pl-2"
                >
                  {item.url}
                </a>
              </div>
            </>
          ))}
        </div>
      )}

      {/* {activeBar === 2 && (
        <>
          <div className="w-full flex text-black dark:text-white">
            <Image
              src={user.avatar ? user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-contain"
            />
            <textarea
              name=""
              id=""
              cols={40}
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your question here..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-row">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5
              `}
              // ${
              //   isLoading && "cursor-no-drop"
              //   }
              // onClick={isLoading ? null : handleSubmitComment}
            >
              <AiOutlineSend size={20} />
            </div>
          </div>
        </>
      )} */}

      {activeBar === 2 && (
        <>
          <div className="w-full flex text-black dark:text-white">
            <Image
              src={user.avatar ? user.avatar.url : defaultAvatar}
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-contain"
            />
            <div className="relative w-full ml-3">
              <textarea
                name=""
                id=""
                cols={40}
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question here..."
                className="outline-none bg-transparent border dark:border-[#ffffff57] border-[#68686842] w-full p-2 rounded 800px:text-[18px] font-Poppins"
              />
              <div className="absolute bottom-0 right-0 mb-2 mr-2">
                <div
                  className={`p-2 cursor-pointer ${
                    LoadingWhileCreatingNewQueston && "cursor-not-allowed"
                  }`}
                  onClick={
                    LoadingWhileCreatingNewQueston
                      ? () => {}
                      : handleQuestionSubmit
                  }
                >
                  <VscSend size={25} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-[#68686842]" />
          <div>
            <ComposeReply
              data={data}
              user={user}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleReplySubmit={handleReplySubmit}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="w-full flex">
                  <Image
                    src={user.avatar ? user.avatar.url : defaultAvatar}
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full w-[50px] h-[50px] object-contain"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] text-black dark:text-white">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>

                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            size={25}
                            color=" rgb(246, 186, 0) "
                            className="ml-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            size={25}
                            color=" rgb(246, 186, 0) "
                            className="ml-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <div className="relative w-full ml-3">
                      <textarea
                        name=""
                        id=""
                        cols={40}
                        rows={5}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                        className="outline-none bg-transparent border dark:border-[#ffffff57] border-[#68686842] w-full p-2 rounded 800px:text-[18px] font-Poppins dark:text-white"
                      />
                      <div className="absolute bottom-0 right-0 mb-2 mr-2">
                        <div
                          className="p-2 cursor-pointer text-black dark:text-white"
                          // onClick={isLoading ? null : handleSubmitComment}
                        >
                          <VscSend size={25} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

const ComposeReply = ({
  data,
  user,
  activeVideo,
  answer,
  setAnswer,
  handleReplySubmit,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <ReplyItem
            key={index}
            index={index}
            item={item}
            data={data}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            activeVideo={activeVideo}
            handleReplySubmit={handleReplySubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const ReplyItem = ({
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleReplySubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
            width={50}
            height={50}
            alt="avatar"
            className="rounded-full w-[30px] h-[30px] object-contain"
          />
          <div className="pl-3 text-black dark:text-white">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {formatDate(item?.createdAt)} {"•"}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="800px:pl-16 mr-2 cursor-pointer text-[#000000b8] dark:text-[#ffffff83]"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Reply"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-[#000000b8] dark:text-[#ffffff83]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item?.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item?.questionReplies.map((item: any, index: number) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={index}
              >
                <div>
                  <Image
                    src={
                      item.user.avatar ? item.user.avatar.url : defaultAvatar
                    }
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full w-[30px] h-[30px] object-contain"
                  />
                </div>
                <div className="pl-3 text-black dark:text-white">
                  <div className="flex items-center">
                    <h5 className="text-[20px] mr-1">{item?.user.name}</h5>
                    <VscVerifiedFilled fill="#4c68d7 " className="mb-2" />
                  </div>
                  <p>{item?.answer}</p>
                  <small className="text-[#000000b8] dark:text-[#ffffff83]">
                    {formatDate(item?.createdAt)} {"•"}
                  </small>
                </div>
              </div>
            ))}

            <>
              <div className="flex w-full relative">
                <textarea
                  cols={40}
                  rows={1}
                  placeholder="Enter your reply"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className=" text-black dark:text-white block 800px:ml-10  outline-none bg-transparent border-b dark:border-[#ffffff57] border-[#68686842] p-[5px] w-[90%]"
                />
                <button
                  type="submit"
                  disabled={answer === "" || answerCreationLoading}
                  className={`${
                    answer === "" ? "cursor-not-allowed" : "cursor-pointer"
                  } p-2  text-black dark:text-white`}
                  onClick={handleReplySubmit}
                >
                  <VscSend size={25} />
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
