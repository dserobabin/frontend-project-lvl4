import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
    prepareHeaders: (header, { getState }) => {
      const { token } = getState().auth.user;
      if (token) {
        header.set('Authorization', `Bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
} = channelsApi;
