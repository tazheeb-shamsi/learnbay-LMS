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
  }),
});
export const { useCreateCourseMutation } = coursesApi;
