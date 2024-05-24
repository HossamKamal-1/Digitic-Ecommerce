import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_ECOMMERCE_API_BASEURL;
const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});

export default ecommerceApi;
