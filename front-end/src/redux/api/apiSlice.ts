import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-lucifer1112k.vercel.app',
  }),
  tagTypes: ['reviews', 'books'],
  endpoints: () => ({}),
});
