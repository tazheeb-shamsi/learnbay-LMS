import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSectionData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `edit-layout`,
        method: "PUT",
        body: { type, image, title, subTitle, faq, categories },
        credentials: "include" as const,
      }),
    }),
   }),
});

export const { useGetHeroSectionDataQuery, useEditLayoutMutation } = layoutApi;
