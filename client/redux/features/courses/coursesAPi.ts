import { updateCourse } from "./../../../../server/controllers/course.controller";
import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "add-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourse: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    getAllUsersCourse: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    addNewQuestion: builder.mutation({
      query: ({ question, contentId, courseId }) => ({
        url: `add-question`,
        method: "PUT",
        body: { question, contentId, courseId },
        credentials: "include" as const,
      }),
    }),

    addAnswerToQuestion: builder.mutation({
      query: ({ questionId, answer, courseId, contentId }) => ({
        url: `add-answer`,
        method: "PUT",
        body: { questionId, answer, courseId, contentId },
        credentials: "include" as const,
      }),
    }),

    addReviewToCourse: builder.mutation({
      query: ({ courseId, review, rating }) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),

    addReplyToReview: builder.mutation({
      query: ({ reviewReply, courseId, reviewId }) => ({
        url: "add-review-reply",
        method: "PUT",
        body: { reviewReply, courseId, reviewId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetAllUsersCourseQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerToQuestionMutation,
  useAddReviewToCourseMutation,
  useAddReplyToReviewMutation,
} = coursesApi;
