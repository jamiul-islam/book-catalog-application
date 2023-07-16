import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books',
    }),
    singleProduct: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/books/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: 'books', id }],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  usePostReviewMutation,
  useGetReviewQuery,
  usePostBookMutation,
  useDeleteBookMutation,
} = productApi;
