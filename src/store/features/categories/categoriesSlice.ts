import ecommerceApi from "@services/ecommerce";
import type { TCategory } from "@custom-types/category";

const categoriesApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => `/categories`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApi;
