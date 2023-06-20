import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      //   query: (name) => `pokemon/${name}`,
      // query: () => 'products?limit=100'
      query: () => 'products?limit=100'
    }),
    getProductsById: builder.query({
        query: (id) => `products/${id}`
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery , useGetProductsByIdQuery} = productsApi;
