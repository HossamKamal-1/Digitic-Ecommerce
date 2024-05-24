import { createSlice } from "@reduxjs/toolkit";
import ecommerceApi from "@services/ecommerce";
import { TComment, type TBlog } from "@custom-types/blog";
import { TProduct } from "@custom-types/product";
import { JSONPrimitive, RequestError } from "@custom-types/shared";
import { RootState } from "@store";
type ProductsState = {
  products: TProduct[];
  isFetching: boolean;
  error: RequestError;
};

const initialState: ProductsState = {
  products: [],
  isFetching: false,
  error: undefined,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     productsApi.endpoints.getProducts.matchPending,
  //     (state) => {
  //       state.isFetching = true;
  //       state.error = undefined;
  //     }
  //   );
  //   builder.addMatcher(
  //     productsApi.endpoints.getProducts.matchFulfilled,
  //     (state, action) => {
  //       state.isFetching = false;
  //       state.products = action.payload;
  //     }
  //   );
  //   builder.addMatcher(
  //     productsApi.endpoints.getProducts.matchRejected,
  //     (state, action) => {
  //       state.isFetching = false;
  //       state.error = action.error;
  //     }
  //   );
  // },
});

// TODO: make getBlogs endpoint
// TODO: make getBlogById Endpoint
// TODO: make getBlogComments by blog id endpoint
// TODO: createBlogComment endpoint

// TODO: get specific products by their ids http://localhost:5070/api/v1/products?id=1&id=3&id=5
// get

const productsApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductBySlug: builder.query<TProduct, string>({
      query: (slug) => `/products?slug=${slug}`,
      transformResponse: (returnValue: TProduct[]) => {
        return returnValue[0];
      },
    }),
    getProducts: builder.query<
      TProduct[],
      Record<string, JSONPrimitive> | string | void
    >({
      query: (searchParams) => {
        if (typeof searchParams === "string") {
          return `/products?${searchParams}`;
        } else if (typeof searchParams === "object") {
          return {
            url: "/products",
            params: searchParams,
          };
        } else {
          return "/products";
        }
      },
    }),
    getBlogs: builder.query<TBlog[], { limit?: number; page?: number } | void>({
      query: (params) => {
        return {
          url: "/blogs",
          ...(typeof params === "object"
            ? {
                params: {
                  _limit: params.limit,
                  _page: params.page,
                },
              }
            : {}),
        };
      },
    }),
    getBlogById: builder.query<TBlog, string>({
      query: (id) => `/blogs/${id}`,
    }),
    getBlogCommentsById: builder.query<TComment[], number>({
      query: (blogId) => `/comments?blogId=${blogId}`,
    }),
  }),
  overrideExisting: false,
});

// Selectors
export const productsSelector = (state: RootState) => state.products;

export const {
  // useGetProductsByIdsQuery,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogCommentsByIdQuery,
} = productsApi;
export default productsSlice.reducer;
