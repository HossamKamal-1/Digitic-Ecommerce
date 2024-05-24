import { createSlice } from "@reduxjs/toolkit";
import ecommerceApi from "@services/ecommerce";

const initialState = {};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {},
  },
});
const authApi = ecommerceApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => "test",
    }),
  }),
  overrideExisting: false,
});
// api hooks
export const { useExampleQuery } = authApi;
// slice actions
export const { login } = authSlice.actions;

export default authSlice.reducer;
