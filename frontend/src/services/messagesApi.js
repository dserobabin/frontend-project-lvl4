import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (header, { getState }) => {
      const { token } = getState().auth.user;
      if (token) {
        header.set('Authorization', `Bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
} = messagesApi;
