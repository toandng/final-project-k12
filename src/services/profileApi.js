import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => "/auth/me",
    }),
    editProfile: build.mutation({
      query: ({ data, ...body }) => ({
        url: `/users/${data.username}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const { useGetProfileQuery, useEditProfileMutation } = profileApi;
