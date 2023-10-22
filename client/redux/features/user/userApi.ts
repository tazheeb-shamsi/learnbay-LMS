import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "change-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "change-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation , useChangePasswordMutation} = userApi;
