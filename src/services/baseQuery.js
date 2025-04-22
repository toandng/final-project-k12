import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api01.f8team.dev/api",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${localStorage.getItem}`);
    return headers;
  },
});
export default baseQuery;
