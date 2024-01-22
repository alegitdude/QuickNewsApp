import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoginValues, UserRegisterValues } from "../models/user";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("jwt");
  if (token != null) {
    return token;
  }
  return "";
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  keepUnusedDataFor: 60 * 5,
  endpoints: (build) => ({
    articleList: build.query({
      query(sources: string) {
        return {
          url: `articles/${sources}`,
        };
      },
    }),
    getCurrentUser: build.query<void, void>({
      query() {
        return {
          url: "account",
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        };
      },
    }),
    login: build.query({
      query(creds: UserLoginValues) {
        return {
          method: "POST",
          url: "account/login",
          body: creds,
        };
      },
    }),
    register: build.query({
      query(creds: UserRegisterValues) {
        return {
          method: "POST",
          url: "account/register",
          body: creds,
        };
      },
    }),
    getAllSources: build.query<void, void>({
      query() {
        return {
          method: "GET",
          url: "articles/sources",
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        };
      },
    }),
    editUserSources: build.mutation({
      query(source: string) {
        return {
          method: "PUT",
          url: `account/${source}`,
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        };
      },
    }),
  }),
});
